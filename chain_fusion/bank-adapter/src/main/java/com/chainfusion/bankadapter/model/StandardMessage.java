package com.chainfusion.bankadapter.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * 網關標準報文（bank-adapter 內部使用，與 transaction-service 保持字段一致）
 */
@Data
public class StandardMessage {
    private String msgId;
    private String payer;
    private String payee;
    private BigDecimal amount;
    private String currency;
    private String channel;
    private boolean onChain;
    private boolean cbdc;
    private String rawData;
    private String signature;
    private String onChainHash;
    private String targetRoute;
    private Instant timestamp;
    private Map<String, String> extension = new HashMap<>();
}
