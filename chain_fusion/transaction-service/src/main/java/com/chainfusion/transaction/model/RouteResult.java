package com.chainfusion.transaction.model;

import lombok.Data;

/**
 * 路由決策結果
 */
@Data
public class RouteResult {
    /** 目標系統（CIPS / SWIFT / mBridge / HK_RTGS / BLOCKCHAIN） */
    private String target;
    /** 是否走鏈上 */
    private boolean onChain;
    /** 路由選擇原因（審計用） */
    private String reason;
    /** 目標節點 URL（由 route-engine 填入） */
    private String nodeUrl;
    /** 跨鏈橋標識（跨鏈時使用） */
    private String bridge;
}
