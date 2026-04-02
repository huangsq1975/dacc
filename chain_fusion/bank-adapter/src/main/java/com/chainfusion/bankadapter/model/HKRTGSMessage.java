package com.chainfusion.bankadapter.model;

import lombok.Data;
import java.math.BigDecimal;

/**
 * 香港 RTGS 報文（實時全額結算系統）
 * 支持港元清算系統（HKD CHATS）和美元清算系統（USD CHATS）
 */
@Data
public class HKRTGSMessage {
    /** 交易 ID */
    private String txId;
    /** 付款行代碼 */
    private String fromBank;
    /** 付款賬號 */
    private String fromAccount;
    /** 收款行代碼 */
    private String toBank;
    /** 收款賬號 */
    private String toAccount;
    /** 結算金額 */
    private BigDecimal settlementAmount;
    /** 貨幣（HKD/USD） */
    private String currency;
    /** 值日日期 */
    private String settlementDate;
    /** 付款用途代碼 */
    private String purposeCode;
    /** 付款用途說明 */
    private String purposeDescription;
    /** HKMA 報文序列號 */
    private String hkmaSequenceNo;
}
