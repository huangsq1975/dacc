package com.chainfusion.transaction.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * 網關標準報文——所有外部渠道協議轉換後的統一內部格式
 */
@Data
public class StandardMessage {
    /** 報文唯一 ID（全局唯一） */
    private String msgId;
    /** 付款方標識（銀行賬號/DID/錢包地址） */
    private String payer;
    /** 收款方標識 */
    private String payee;
    /** 交易金額 */
    private BigDecimal amount;
    /** 交易貨幣（CNY/HKD/USD/eCNY/CBDC） */
    private String currency;
    /** 來源渠道（CIPS/SWIFT/mBridge/HK_RTGS） */
    private String channel;
    /** 是否為鏈上交易 */
    private boolean onChain;
    /** 是否為 CBDC 數字貨幣交易 */
    private boolean cbdc;
    /** 原始報文內容（留存合規） */
    private String rawData;
    /** 請求簽名 */
    private String signature;
    /** 鏈上哈希（存證後填入） */
    private String onChainHash;
    /** 目標路由（CIPS/SWIFT/mBridge/HK_RTGS/BLOCKCHAIN） */
    private String targetRoute;
    /** 時間戳 */
    private Instant timestamp;
    /** 擴展字段（walletId/jurisdiction 等） */
    private Map<String, String> extension = new HashMap<>();

    public boolean isCrossBorder() {
        // 跨境判斷：付款方與收款方不在同一司法轄區
        // TODO: 對接身份映射服務獲取所屬轄區
        return true;
    }

    public boolean isHKChannel() {
        return "HK_RTGS".equals(channel) || "SWIFT".equals(channel);
    }
}
