package com.chainfusion.compliance.regulator;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * 監管上報報文（code.md 四）
 *
 * 覆蓋：人行（PBOC）、香港金管局（HKMA）、跨境監管節點
 * 留痕 7 年（AuditLogService 負責持久化）
 */
@Data
public class RegulatorReport {

    /** 原始報文 ID */
    private String msgId;

    /** 交易渠道類型（CIPS / SWIFT / MBRIDGE / HK_RTGS） */
    private String transactionType;

    /** 付款方 */
    private String payer;

    /** 收款方 */
    private String payee;

    /** 金額 */
    private BigDecimal amount;

    /** 幣種 */
    private String currency;

    /** 鏈上交易哈希（已上鏈則有值） */
    private String hash;

    /** 上報時間 */
    private Instant timestamp;

    /** 原始報文內容（用於審計還原） */
    private String rawData;

    /** 目標監管機構（PBOC / HKMA / CROSS_BORDER） */
    private String regulatorTarget;

    /** 上報狀態（PENDING / REPORTED / FAILED） */
    private ReportStatus status;

    public enum ReportStatus {
        PENDING, REPORTED, FAILED
    }
}
