package com.chainfusion.datasync.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * 上鏈存證數據（鏈下 → 上鏈）
 */
@Data
public class ChainData {
    private String msgId;
    private String hash;         // SHA-256 哈希（防篡改）
    private Instant timestamp;
    private String source;       // 來源渠道（CIPS/SWIFT/mBridge/HK_RTGS）
    private String payer;
    private String payee;
    private BigDecimal amount;
    private String currency;
    private String targetChain;  // 存證目標鏈（ETH/Conflux）
}
