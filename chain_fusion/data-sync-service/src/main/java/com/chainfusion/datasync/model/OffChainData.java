package com.chainfusion.datasync.model;

import lombok.Data;
import java.time.Instant;

/**
 * 鏈下同步數據（鏈上確認 → 銀行系統）
 */
@Data
public class OffChainData {
    private String msgId;
    private String blockHash;
    private String status;       // CONFIRMED / FAILED
    private Instant confirmTime;
    private Long blockNumber;
    private String chainId;
}
