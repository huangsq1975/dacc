package com.chainfusion.datasync.service;

import com.chainfusion.datasync.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * 托管系統核心服務（code.md 七）
 * 覆蓋：托管錢包余額實時同步、鏈上資產變動監聽、對賬校驗、異常處理
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustodySystemService {

    private final Map<String, CustodyWallet> walletMap = new ConcurrentHashMap<>();

    private final BlockchainClientService       blockchainClient;
    private final FinancialInstitutionClient    financialInstitutionClient;
    private final CustodyDBService              custodyDB;
    private final SyncLogService                syncLogService;
    private final MonitorNotificationService    monitorService;
    private final FinancialInstitutionService   institutionService;
    private final KeyService                    keyService;

    /** 余額一致性誤差閾值（金融級精度） */
    private static final BigDecimal BALANCE_THRESHOLD = new BigDecimal("0.0001");

    /**
     * 初始化托管錢包（關聯金融機構、密鑰、鏈上地址）
     * 對應 code.md：CustodySystemService.initCustodyWallet()
     */
    public void initCustodyWallet(String financialInstitutionId, String walletId,
                                   String chainAddress, String keyId) {
        // 校驗金融機構權限
        if (!institutionService.checkPermission(financialInstitutionId)) {
            throw new SecurityException("金融機構無托管權限: " + financialInstitutionId);
        }

        // 綁定密鑰（HSM 硬件存儲，關聯密鑰與地址）
        keyService.bindKeyAndAddress(keyId, chainAddress);

        // 創建托管錢包
        CustodyWallet wallet = new CustodyWallet();
        wallet.setWalletId(walletId);
        wallet.setFinancialInstitutionId(financialInstitutionId);
        wallet.setChainAddress(chainAddress);
        wallet.setKeyId(keyId);
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setSyncStatus(SyncStatus.SYNCED);

        walletMap.put(walletId, wallet);
        custodyDB.saveWallet(wallet);

        syncLogService.save("WALLET_INIT", walletId, financialInstitutionId);
        log.info("[CUSTODY] init wallet={} institution={} address={}", walletId, financialInstitutionId, chainAddress);
    }

    /**
     * 托管錢包 ↔ 鏈上資產實時同步（核心方法，批量處理所有錢包）
     * 對應 code.md：CustodySystemService.syncCustodyWalletWithChain()
     */
    public void syncCustodyWalletWithChain() {
        for (CustodyWallet wallet : walletMap.values()) {
            try {
                // 標記同步中
                wallet.setSyncStatus(SyncStatus.SYNCING);

                // 從鏈上查詢最新資產余額（支持多鏈：Conflux/ETH 等）
                ChainAsset chainAsset = blockchainClient.getAssetBalance(wallet.getChainAddress());

                // 從托管系統查詢本地余額
                BigDecimal localBalance = custodyDB.queryWalletBalance(wallet.getWalletId());

                // 對賬校驗（鏈上與本地余額一致性）
                if (checkBalanceConsistency(chainAsset.getBalance(), localBalance)) {
                    wallet.setLastSyncTime(LocalDateTime.now());
                    wallet.setSyncStatus(SyncStatus.SYNCED);
                    syncLogService.save("WALLET_CHAIN_SYNC", wallet.getWalletId(), "余額一致");
                } else {
                    // 余額不一致，觸發自動對賬修復
                    reconcileWalletBalance(wallet, chainAsset.getBalance(), localBalance);
                    monitorService.alert(new RuntimeException(
                        "托管錢包與鏈上資產不一致，已自動修復：" + wallet.getWalletId()));
                }

                // 同步鏈上資產變動記錄（交易明細、RWA 代幣流轉）
                syncChainAssetTransaction(wallet, chainAsset.getTransactionHistory());

            } catch (Exception e) {
                wallet.setSyncStatus(SyncStatus.SYNC_FAILED);
                syncLogService.save("WALLET_CHAIN_SYNC_FAILED", wallet.getWalletId(), e.getMessage());
                monitorService.alert(new RuntimeException(
                    "托管錢包同步失敗：" + wallet.getWalletId() + "，原因：" + e.getMessage()));
                log.error("[CUSTODY] sync failed wallet={}", wallet.getWalletId(), e);
            }
        }
    }

    /**
     * 同步指定錢包（單錢包觸發，code.md 7.2）
     */
    public void syncCustodyWalletWithChainByWalletId(String walletId) {
        CustodyWallet wallet = getWalletById(walletId);
        if (wallet == null) {
            log.warn("[CUSTODY] wallet not found: {}", walletId);
            return;
        }
        try {
            wallet.setSyncStatus(SyncStatus.SYNCING);
            ChainAsset chainAsset = blockchainClient.getAssetBalance(wallet.getChainAddress());
            BigDecimal localBalance = custodyDB.queryWalletBalance(walletId);

            if (checkBalanceConsistency(chainAsset.getBalance(), localBalance)) {
                wallet.setLastSyncTime(LocalDateTime.now());
                wallet.setSyncStatus(SyncStatus.SYNCED);
            } else {
                reconcileWalletBalance(wallet, chainAsset.getBalance(), localBalance);
            }
            syncChainAssetTransaction(wallet, chainAsset.getTransactionHistory());
            log.info("[CUSTODY] single sync completed wallet={}", walletId);
        } catch (Exception e) {
            wallet.setSyncStatus(SyncStatus.SYNC_FAILED);
            log.error("[CUSTODY] single sync failed wallet={}", walletId, e);
        }
    }

    /**
     * 托管錢包資產查詢（供金融機構、網關調用）
     * 對應 code.md：CustodySystemService.queryWalletAsset()
     */
    public CustodyWalletQueryResult queryWalletAsset(String walletId) {
        CustodyWallet wallet = walletMap.get(walletId);
        if (wallet == null) {
            throw new IllegalArgumentException("托管錢包不存在：" + walletId);
        }

        // 實時查詢鏈上最新余額
        ChainAsset chainAsset = blockchainClient.getAssetBalance(wallet.getChainAddress());

        CustodyWalletQueryResult result = new CustodyWalletQueryResult();
        result.setWalletId(walletId);
        result.setFinancialInstitutionId(wallet.getFinancialInstitutionId());
        result.setChainAddress(wallet.getChainAddress());
        result.setCurrentBalance(chainAsset.getBalance());
        result.setSyncStatus(wallet.getSyncStatus());
        result.setLastSyncTime(wallet.getLastSyncTime());

        List<ChainTransaction> recent = chainAsset.getTransactionHistory();
        result.setRecentTransactions(recent.subList(0, Math.min(10, recent.size())));
        return result;
    }

    public CustodyWallet getWalletById(String walletId) {
        return walletMap.get(walletId);
    }

    // ── 私有方法 ──────────────────────────────────────────────────

    /**
     * 余額一致性校驗（允許微小誤差，金融級精度）
     * 對應 code.md：checkBalanceConsistency()
     */
    private boolean checkBalanceConsistency(BigDecimal chainBalance, BigDecimal localBalance) {
        return chainBalance.subtract(localBalance).abs().compareTo(BALANCE_THRESHOLD) <= 0;
    }

    /**
     * 余額對賬修復（以鏈上數據為基準）
     * 對應 code.md：reconcileWalletBalance()
     */
    private void reconcileWalletBalance(CustodyWallet wallet, BigDecimal chainBalance, BigDecimal localBalance) {
        syncLogService.save("WALLET_RECONCILE_BEFORE", wallet.getWalletId(),
            "鏈上余額：" + chainBalance + "，本地余額：" + localBalance);

        // 以鏈上余額為基準，更新本地托管余額
        custodyDB.updateWalletBalance(wallet.getWalletId(), chainBalance);
        wallet.setBalance(chainBalance);
        wallet.setLastSyncTime(LocalDateTime.now());
        wallet.setSyncStatus(SyncStatus.SYNCED);

        syncLogService.save("WALLET_RECONCILE_AFTER", wallet.getWalletId(), "修復後余額：" + chainBalance);

        // 同步至金融機構系統（告知余額調整）
        financialInstitutionClient.pushWalletBalance(
            wallet.getFinancialInstitutionId(), wallet.getWalletId(), chainBalance);

        log.info("[CUSTODY] reconciled wallet={} chainBalance={} localWas={}",
            wallet.getWalletId(), chainBalance, localBalance);
    }

    /**
     * 同步鏈上資產變動記錄（交易明細、RWA 代幣流轉）
     * 對應 code.md：syncChainAssetTransaction()
     */
    private void syncChainAssetTransaction(CustodyWallet wallet, List<ChainTransaction> transactions) {
        List<ChainTransaction> unsyncedTx = transactions.stream()
            .filter(tx -> !custodyDB.isTransactionSynced(tx.getTxHash()))
            .collect(Collectors.toList());

        if (!unsyncedTx.isEmpty()) {
            custodyDB.batchSaveTransaction(unsyncedTx, wallet.getWalletId());
            financialInstitutionClient.pushTransactions(
                wallet.getFinancialInstitutionId(), unsyncedTx);
            syncLogService.save("WALLET_TRANSACTION_SYNC", wallet.getWalletId(),
                "同步交易數：" + unsyncedTx.size());
            log.info("[CUSTODY] synced {} transactions for wallet={}", unsyncedTx.size(), wallet.getWalletId());
        }
    }

    // ── 內部數據結構 ──────────────────────────────────────────────

    @lombok.Data
    public static class ChainAsset {
        private BigDecimal balance;
        private List<ChainTransaction> transactionHistory;
    }

    @lombok.Data
    public static class ChainTransaction {
        private String txHash;
        private BigDecimal amount;
        private String direction; // IN / OUT
        private java.time.Instant timestamp;
        private String status;
    }

    @lombok.Data
    public static class CustodyWalletQueryResult {
        private String walletId;
        private String financialInstitutionId;
        private String chainAddress;
        private BigDecimal currentBalance;
        private SyncStatus syncStatus;
        private LocalDateTime lastSyncTime;
        private List<ChainTransaction> recentTransactions;
    }
}
