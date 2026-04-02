package com.chainfusion.datasync.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

/** 標準報文（data-sync-service 接收用） */
@Data
public class StandardMessage {
    private String msgId;
    private String payer;
    private String payee;
    private BigDecimal amount;
    private String currency;
    private String channel;
    private boolean onChain;
    private String rawData;
    private String onChainHash;
    private Instant timestamp;
    private Map<String, String> extension;
}
