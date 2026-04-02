package com.chainfusion.bankadapter.controller;

import com.chainfusion.bankadapter.model.StandardMessage;
import com.chainfusion.bankadapter.protocol.ProtocolConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 協議轉換 REST 接口（供 transaction-service 內部調用）
 */
@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProtocolConverterController {

    private final ProtocolConverter protocolConverter;

    /**
     * POST /api/v1/convert — 報文協議轉換
     * transaction-service 的 ProtocolConverterService 調用此端點
     */
    @PostMapping("/convert")
    public ResponseEntity<StandardMessage> convert(@RequestBody Map<String, Object> payload) {
        String channel    = (String) payload.get("channel");
        String rawContent = (String) payload.get("rawContent");

        if (channel == null || rawContent == null) {
            return ResponseEntity.badRequest().build();
        }

        log.info("[CONVERT] channel={} msgId={}", channel, payload.get("msgId"));
        StandardMessage standardMsg = protocolConverter.convert(rawContent, channel);

        // 回填 msgId（如解析結果為空則使用請求傳入的）
        if (standardMsg.getMsgId() == null && payload.get("msgId") != null) {
            standardMsg.setMsgId((String) payload.get("msgId"));
        }

        return ResponseEntity.ok(standardMsg);
    }

    /**
     * POST /api/v1/outbound/send — 向目標清算系統發送報文
     * transaction-service 的 OffChainClient 調用此端點
     */
    @PostMapping("/outbound/send")
    public ResponseEntity<Void> sendOutbound(@RequestBody StandardMessage standardMsg) {
        log.info("[OUTBOUND] sending msgId={} target={}", standardMsg.getMsgId(), standardMsg.getTargetRoute());
        // 根據 targetRoute 反向轉換並發送
        switch (standardMsg.getTargetRoute()) {
            case "CIPS"    -> sendToCIPS(protocolConverter.convertToCIPS(standardMsg));
            case "SWIFT"   -> sendToSWIFT(protocolConverter.convertToSWIFT(standardMsg));
            case "mBridge" -> sendToMBridge(protocolConverter.convertToMBridge(standardMsg));
            case "HK_RTGS" -> sendToHKRTGS(standardMsg);
            default -> throw new IllegalArgumentException("Unknown target: " + standardMsg.getTargetRoute());
        }
        return ResponseEntity.ok().build();
    }

    // ── 發送方法（TODO: 對接真實外部系統）─────────────────────────

    private void sendToCIPS(com.chainfusion.bankadapter.model.CIPSMessage msg) {
        // TODO: 通過 CIPS 接口發送 ISO 20022 pacs.008 報文
        log.info("[OUTBOUND] send to CIPS instructionId={}", msg.getInstructionId());
    }

    private void sendToSWIFT(com.chainfusion.bankadapter.model.SWIFTMessage msg) {
        // TODO: 通過 SWIFT Alliance Gateway 發送 MT103/MT202
        log.info("[OUTBOUND] send to SWIFT field20={} type={}", msg.getField20(), msg.getMsgType());
    }

    private void sendToMBridge(com.chainfusion.bankadapter.model.MBridgeMessage msg) {
        // TODO: 通過 mBridge API 提交 CBDC 轉賬
        log.info("[OUTBOUND] send to mBridge payer={} payee={}", msg.getPayerWallet(), msg.getPayeeWallet());
    }

    private void sendToHKRTGS(StandardMessage msg) {
        // TODO: 通過 HKMA RTGS 接口發送結算指令
        log.info("[OUTBOUND] send to HK_RTGS msgId={} amount={} {}", msg.getMsgId(), msg.getAmount(), msg.getCurrency());
    }
}
