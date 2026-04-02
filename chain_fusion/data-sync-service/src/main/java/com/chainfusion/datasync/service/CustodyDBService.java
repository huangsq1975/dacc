package com.chainfusion.datasync.service;

import com.chainfusion.datasync.model.CustodyWallet;
import com.chainfusion.datasync.service.CustodySystemService.ChainTransaction;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 托管系統數據庫服務（in-memory stub，生產環境替換為 JPA / MyBatis 實現）
 */
@Slf4j
@Service
public class CustodyDBService {

    private final Map<String, CustodyWallet> walletStore = new ConcurrentHashMap<>();
    private final Map<String, BigDecimal> balanceStore    = new ConcurrentHashMap<>();
    private final Set<String> syncedTxHashes             = ConcurrentHashMap.newKeySet();

    public void saveWallet(CustodyWallet wallet) {
        walletStore.put(wallet.getWalletId(), wallet);
        balanceStore.put(wallet.getWalletId(), wallet.getBalance());
        log.info("[CUSTODY_DB] saved wallet={}", wallet.getWalletId());
    }

    public BigDecimal queryWalletBalance(String walletId) {
        return balanceStore.getOrDefault(walletId, BigDecimal.ZERO);
    }

    public void updateWalletBalance(String walletId, BigDecimal balance) {
        balanceStore.put(walletId, balance);
        CustodyWallet w = walletStore.get(walletId);
        if (w != null) w.setBalance(balance);
        log.info("[CUSTODY_DB] updated balance wallet={} balance={}", walletId, balance);
    }

    public boolean isTransactionSynced(String txHash) {
        return syncedTxHashes.contains(txHash);
    }

    public void batchSaveTransaction(List<ChainTransaction> transactions, String walletId) {
        for (ChainTransaction tx : transactions) {
            syncedTxHashes.add(tx.getTxHash());
        }
        log.info("[CUSTODY_DB] saved {} transactions for wallet={}", transactions.size(), walletId);
    }
}
