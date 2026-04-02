package com.chainfusion.datasync.service;

import com.chainfusion.datasync.model.OffChainData;
import org.springframework.stereotype.Service;

/**
 * 銀行核心系統客戶端（stub — 對接各金融機構核心系統）
 */
@Service
public class BankCoreClientService {

    /**
     * 將鏈上確認數據推送至銀行核心系統
     */
    public void push(OffChainData offChainData) {
        // TODO: 調用 bank-adapter /api/v1/outbound/send 下發至對應金融機構
        throw new UnsupportedOperationException("BankCoreClientService.push() not implemented");
    }
}
