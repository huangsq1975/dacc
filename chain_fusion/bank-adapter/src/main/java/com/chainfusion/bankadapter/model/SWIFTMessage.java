package com.chainfusion.bankadapter.model;

import lombok.Data;
import java.math.BigDecimal;

/**
 * SWIFT MT 報文（FIN 格式，主要處理 MT103/MT202）
 *
 * MT103：單筆客戶匯款
 * MT202：金融機構轉賬
 */
@Data
public class SWIFTMessage {
    /** Field 20：交易參考編號（唯一 ID） */
    private String field20;
    /** Field 23B：銀行業務代碼（CRED/SPRI/SSTD/SDVA） */
    private String field23B;
    /** Field 32A：值日日期+貨幣+金額（格式：YYMMDD + CCY + 金額） */
    private BigDecimal field32B;
    /** Field 32A 貨幣 */
    private String currency;
    /** Field 32A 值日日期 */
    private String valueDate;
    /** Field 50K：付款方（Ordering Customer） */
    private String field50K;
    /** Field 52A：付款行（Ordering Institution） */
    private String field52A;
    /** Field 56A：中間行 */
    private String field56A;
    /** Field 57A：收款行 */
    private String field57A;
    /** Field 59：收款方（Beneficiary Customer） */
    private String field59;
    /** Field 70：匯款用途 */
    private String field70;
    /** Field 71A：費用承擔（OUR/BEN/SHA） */
    private String field71A;
    /** 報文類型（MT103/MT202） */
    private String msgType;
    /** 原始 MT 報文字符串 */
    private String rawMt;
}
