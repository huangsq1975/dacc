package com.chainfusion.transaction.service;

import com.chainfusion.transaction.client.*;
import com.chainfusion.transaction.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

/**
 * 分佈式多鏈融合網關統一入口服務（code.md 一）
 *
 * 完整交易處理流程：
 *   接收請求 → 日誌+監控埋點 → 基礎校驗 → 協議轉換 → 合規校驗
 *   → 路由決策 → 執行交易（鏈上/鏈下）→ 雙向數據同步
 *   → 上報監管節點 → 返回結果
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GatewayCoreService {

    private final MonitorService    monitorService;
    private final RouterService     routerService;
    private final ProtocolConverterService protocolConverter;
    private final BlockchainClient  blockchainClient;
    private final OffChainClient    offChainClient;
    private final ComplianceClient  complianceClient;
    private final DataSyncClient    dataSyncClient;
    private final RegulatorClient   regulatorClient;
    private final RequestValidator  requestValidator;

    /**
     * 接收所有外部請求——銀行/外資行/CIPS/SWIFT/mBridge/香港RTGS
     * 對應 code.md：GatewayCoreService.receiveRequest()
     *
     * @param request 外部原始請求
     * @param channel 來源渠道類型
     * @return 網關統一響應
     */
    public GatewayResponse receiveRequest(Request request, ChannelType channel) {
        long startNanos = System.nanoTime();

        // 1. 日誌 + 監控埋點
        monitorService.recordRequest(channel, request.getMsgId());
        log.info("[GATEWAY] receiveRequest msgId={} channel={}", request.getMsgId(), channel);

        try {
            // 2. 基礎校驗：格式、簽名、權限
            requestValidator.validate(request, channel);

            // 3. 報文協議轉換（核心）：各渠道原始格式 → StandardMessage
            StandardMessage standardMsg = protocolConverter.convert(request, channel);
            standardMsg.setTimestamp(Instant.now());

            // 4. 統一合規校驗（AML/反洗錢/制裁名單）
            complianceClient.check(standardMsg);

            // 5. 路由決策：選擇最優清算鏈路
            RouteResult route = routerService.selectBestRoute(standardMsg);

            // 6. 執行交易：鏈上上鏈 / 鏈下發往金融機構
            if (route.isOnChain()) {
                String txHash = blockchainClient.sendToChain(standardMsg);
                standardMsg.setOnChainHash(txHash);
                log.info("[GATEWAY] on-chain submit msgId={} txHash={}", standardMsg.getMsgId(), txHash);
            } else {
                offChainClient.sendToFinancialInstitution(standardMsg);
                log.info("[GATEWAY] off-chain send msgId={} target={}", standardMsg.getMsgId(), route.getTarget());
            }

            // 7. 雙向數據同步（鏈下→上鏈存證；鏈上確認→推送金融機構）
            dataSyncClient.syncToChain(standardMsg);
            dataSyncClient.syncToOffChain(standardMsg);

            // 8. 同步托管錢包資產（如有 walletId）
            dataSyncClient.syncToCustody(standardMsg);

            // 9. 上報監管節點（人行/香港金管局/跨境監管）
            regulatorClient.report(standardMsg);

            // 10. 成功埋點 + 延遲記錄
            monitorService.recordSuccess(channel);
            monitorService.recordLatency(channel, startNanos);

            log.info("[GATEWAY] success msgId={} route={} onChain={}",
                standardMsg.getMsgId(), route.getTarget(), route.isOnChain());

            return GatewayResponse.ok(standardMsg);

        } catch (ComplianceException ce) {
            log.warn("[GATEWAY] compliance blocked msgId={} risk={}", request.getMsgId(), ce.getRiskLevel());
            monitorService.alert(ce);
            return GatewayResponse.fail("COMPLIANCE_BLOCKED", ce.getMessage());

        } catch (ValidationException ve) {
            log.warn("[GATEWAY] validation failed msgId={} reason={}", request.getMsgId(), ve.getMessage());
            return GatewayResponse.fail("VALIDATION_FAILED", ve.getMessage());

        } catch (Exception e) {
            log.error("[GATEWAY] unexpected error msgId={}", request.getMsgId(), e);
            monitorService.alert(e);
            return GatewayResponse.fail("INTERNAL_ERROR", e.getMessage());
        }
    }
}
