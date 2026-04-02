package com.chainfusion.datasync.service;

import com.chainfusion.datasync.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HexFormat;

/**
 * 鏈上鏈下雙向數據同步服務（code.md 三）
 *
 * 兩個核心方法：
 *   syncToChain   — 鏈下數據 → 上鏈存證（銀行交易 → 區塊鏈哈希存證）
 *   syncToOffChain — 鏈上確認 → 鏈下同步（區塊鏈確認 → 推送金融機構）
 *
 * 補充方法（code.md 7.2）：
 *   syncToCustodySystem — 觸發托管錢包資產同步
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DataSyncService {

    private final BlockchainClientService blockchainClient;
    private final BankCoreClientService   bankCoreClient;
    private final ReconciliationService   reconciliationService;
    private final SyncLogService          syncLogService;
    private final CustodySystemService    custodySystemService;

    /**
     * 鏈下數據 → 上鏈存證（銀行交易 → 區塊鏈）
     * 對應 code.md：DataSyncService.syncToChain()
     */
    public void syncToChain(StandardMessage msg) {
        // 1. 生成哈希（不可篡改）
        String hash = sha256(msg.getRawData() != null ? msg.getRawData() : msg.getMsgId());

        // 2. 組裝上鏈數據
        ChainData chainData = new ChainData();
        chainData.setMsgId(msg.getMsgId());
        chainData.setHash(hash);
        chainData.setTimestamp(msg.getTimestamp() != null ? msg.getTimestamp() : Instant.now());
        chainData.setSource(msg.getChannel());
        chainData.setPayer(msg.getPayer());
        chainData.setPayee(msg.getPayee());
        chainData.setAmount(msg.getAmount());
        chainData.setCurrency(msg.getCurrency());

        // 3. 上鏈存證（Conflux / ETH / 聯盟鏈）
        String txHash = blockchainClient.write(chainData);
        log.info("[SYNC→CHAIN] msgId={} hash={} txHash={}", msg.getMsgId(), hash, txHash);

        // 4. 記錄同步日誌
        syncLogService.save("SYNC_TO_CHAIN", msg.getMsgId(), hash);
    }

    /**
     * 鏈上確認 → 鏈下同步（區塊鏈 → 銀行/外資行系統）
     * 對應 code.md：DataSyncService.syncToOffChain()
     */
    public void syncToOffChain(StandardMessage msg) {
        // 1. 從鏈上獲取交易確認信息
        ChainReceipt receipt = blockchainClient.getReceipt(msg.getMsgId());

        // 2. 轉換為銀行可識別格式
        OffChainData offChainData = new OffChainData();
        offChainData.setMsgId(msg.getMsgId());
        offChainData.setBlockHash(receipt.getBlockHash());
        offChainData.setStatus(receipt.getStatus());
        offChainData.setConfirmTime(receipt.getBlockTime());
        offChainData.setBlockNumber(receipt.getBlockNumber());
        offChainData.setChainId(receipt.getChainId());

        // 3. 推送給國內外大小金融機構與外資行核心系統
        bankCoreClient.push(offChainData);
        log.info("[SYNC→OFFCHAIN] msgId={} blockHash={} status={}",
            msg.getMsgId(), receipt.getBlockHash(), receipt.getStatus());

        // 4. 對賬
        reconciliationService.match(msg.getMsgId(), receipt);
    }

    /**
     * 鏈上數據同步至托管系統（觸發托管錢包更新）
     * 對應 code.md 7.2：DataSyncService.syncToCustodySystem()
     */
    public void syncToCustodySystem(StandardMessage msg) {
        if (msg.getExtension() == null) return;
        String walletId = msg.getExtension().get("walletId");
        if (walletId == null || walletId.isBlank()) return;

        // 觸發托管系統同步該錢包資產
        custodySystemService.syncCustodyWalletWithChainByWalletId(walletId);
        syncLogService.save("SYNC_TO_CUSTODY", msg.getMsgId(), walletId);
        log.info("[SYNC→CUSTODY] msgId={} walletId={}", msg.getMsgId(), walletId);
    }

    // ── 工具方法 ──────────────────────────────────────────────────

    private static String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new RuntimeException("SHA-256 hash failed", e);
        }
    }

    /** 鏈上收據（內部模型） */
    public record ChainReceipt(
        String txHash, String blockHash, Long blockNumber,
        String status, Instant blockTime, String chainId
    ) {}
}
