package com.chainfusion.datasync.model;

/** 托管錢包同步狀態 */
public enum SyncStatus {
    SYNCED,      // 同步完成
    SYNCING,     // 同步中
    SYNC_FAILED  // 同步失敗
}
