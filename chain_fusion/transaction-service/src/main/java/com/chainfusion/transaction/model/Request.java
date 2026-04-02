package com.chainfusion.transaction.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

/**
 * 外部請求統一封裝（銀行/CIPS/SWIFT/mBridge/HK_RTGS 原始報文）
 */
@Data
public class Request {
    /** 報文唯一 ID */
    private String msgId;
    /** 原始報文內容（XML/JSON/二進制） */
    private byte[] rawPayload;
    /** 報文字符串（可讀格式） */
    private String rawContent;
    /** 來源渠道 */
    private ChannelType channel;
    /** 簽名（用於請求校驗） */
    private String signature;
    /** 接收時間戳 */
    private Instant receivedAt;
    /** 擴展字段（各渠道特定字段） */
    private Map<String, String> extensions;
}
