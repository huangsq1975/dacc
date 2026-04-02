package com.chainfusion.datasync.service;

import com.chainfusion.datasync.model.ChainData;
import com.chainfusion.datasync.service.CustodySystemService.ChainAsset;
import com.chainfusion.datasync.service.DataSyncService.ChainReceipt;
import org.springframework.stereotype.Service;

/**
 * 鏈上客戶端服務（stub — 對接 walletos / keyvault-gateway 實現）
 */
@Service
public class BlockchainClientService {

    /**
     * 將數據寫入區塊鏈，返回交易哈希
     */
    public String write(ChainData chainData) {
        // TODO: 調用 walletos JSON-RPC 提交上鏈
        throw new UnsupportedOperationException("BlockchainClientService.write() not implemented");
    }

    /**
     * 查詢鏈上收據
     */
    public ChainReceipt getReceipt(String msgId) {
        // TODO: 調用 walletos / RPC 查詢交易確認狀態
        throw new UnsupportedOperationException("BlockchainClientService.getReceipt() not implemented");
    }

    /**
     * 查詢鏈上地址資產余額及交易歷史
     */
    public ChainAsset getAssetBalance(String chainAddress) {
        // TODO: 調用 walletos getBalance + getTransactionHistory
        throw new UnsupportedOperationException("BlockchainClientService.getAssetBalance() not implemented");
    }
}
