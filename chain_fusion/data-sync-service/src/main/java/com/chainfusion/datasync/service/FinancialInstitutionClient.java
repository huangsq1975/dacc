package com.chainfusion.datasync.service;

import com.chainfusion.datasync.service.CustodySystemService.ChainTransaction;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * 金融機構客戶端（stub — 推送余額和交易數據至各金融機構系統）
 */
@Slf4j
@Service
public class FinancialInstitutionClient {

    /**
     * 推送錢包余額變動通知至金融機構
     */
    public void pushWalletBalance(String institutionId, String walletId, BigDecimal balance) {
        // TODO: HTTP/MQ 推送至對應金融機構的余額更新接口
        log.info("[FI_CLIENT] pushWalletBalance institutionId={} walletId={} balance={}", institutionId, walletId, balance);
    }

    /**
     * 批量推送交易流水至金融機構
     */
    public void pushTransactions(String institutionId, List<ChainTransaction> transactions) {
        // TODO: HTTP/MQ 批量推送交易明細
        log.info("[FI_CLIENT] pushTransactions institutionId={} count={}", institutionId, transactions.size());
    }
}
