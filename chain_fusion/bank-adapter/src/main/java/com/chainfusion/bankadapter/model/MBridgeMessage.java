package com.chainfusion.bankadapter.model;

import lombok.Data;
import java.math.BigDecimal;

/**
 * mBridge 報文（多邊央行數字貨幣橋）
 * 支持 eCNY/CBDC 跨境轉賬
 */
@Data
public class MBridgeMessage {
    /** 鏈上交易哈希 */
    private String txHash;
    /** 付款方錢包地址 */
    private String payerWallet;
    /** 收款方錢包地址 */
    private String payeeWallet;
    /** CBDC 金額 */
    private BigDecimal cbdcAmount;
    /** 貨幣類型（eCNY/CBDC/DIGITAL_HKD） */
    private String currency;
    /** 源鏈（mBridge 子鏈標識） */
    private String sourceChain;
    /** 目標鏈 */
    private String targetChain;
    /** 是否已在鏈上確認 */
    private boolean confirmed;
    /** 確認塊高 */
    private Long blockNumber;
    /** 智能合約地址 */
    private String contractAddress;
}
