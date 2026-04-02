package com.chainfusion.datasync.service;

import com.chainfusion.datasync.service.DataSyncService.ChainReceipt;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 對賬服務（stub — 驗證鏈上確認與本地記錄一致性）
 */
@Slf4j
@Service
public class ReconciliationService {

    /**
     * 以 msgId 和鏈上收據進行對賬
     */
    public void match(String msgId, ChainReceipt receipt) {
        // TODO: 查詢本地交易記錄，與 receipt 比對狀態、金額、時間戳
        log.info("[RECONCILE] msgId={} blockHash={} status={}", msgId, receipt.blockHash(), receipt.status());
    }
}
