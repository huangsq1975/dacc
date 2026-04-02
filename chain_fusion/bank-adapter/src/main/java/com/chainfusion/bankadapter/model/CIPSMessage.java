package com.chainfusion.bankadapter.model;

import lombok.Data;
import java.math.BigDecimal;

/**
 * CIPS 報文（人民幣跨境支付系統，ISO 20022 pacs.008 格式）
 */
@Data
public class CIPSMessage {
    /** 指令 ID（對應 pacs.008 MsgId） */
    private String instructionId;
    /** 付款賬號（借方賬號） */
    private String debtorAccount;
    /** 收款賬號（貸方賬號） */
    private String creditorAccount;
    /** 金額 */
    private BigDecimal amount;
    /** 貨幣（通常為 CNY） */
    private String currency;
    /** 原始 XML 報文 */
    private String xmlContent;
    /** CIPS 數字簽名 */
    private String signature;
    /** 值日日期 */
    private String settlementDate;
    /** 付款方銀行 BIC */
    private String debtorBic;
    /** 收款方銀行 BIC */
    private String creditorBic;
    /** 匯款用途 */
    private String remittanceInfo;
}
