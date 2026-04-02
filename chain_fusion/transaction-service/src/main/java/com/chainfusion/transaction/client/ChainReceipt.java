package com.chainfusion.transaction.client;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * 鏈上交易收據
 */
@Data
public class ChainReceipt {
    private String txHash;
    private String blockHash;
    private Long blockNumber;
    /** CONFIRMED / PENDING / FAILED */
    private String status;
    private Instant blockTime;
    private BigDecimal gasUsed;
    private String chainId;
}
