package com.chainfusion.datasync.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 托管錢包實體（code.md 七）
 */
@Data
public class CustodyWallet {
    /** 托管錢包 ID */
    private String walletId;
    /** 所屬金融機構 ID（國內外大小金融機構與外資行） */
    private String financialInstitutionId;
    /** 鏈上地址 */
    private String chainAddress;
    /** 關聯密鑰 ID（HSM 中存儲） */
    private String keyId;
    /** 本地托管余額 */
    private BigDecimal balance;
    /** 同步狀態 */
    private SyncStatus syncStatus;
    /** 最後同步時間 */
    private LocalDateTime lastSyncTime;
}
