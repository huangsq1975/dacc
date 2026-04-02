package com.chainfusion.transaction.model;

/**
 * 渠道類型：網關支持的所有接入渠道
 */
public enum ChannelType {
    CIPS,      // 人民幣跨境支付系統
    SWIFT,     // 環球銀行金融電信協會
    MBRIDGE,   // 多邊央行數字貨幣橋
    HK_RTGS,   // 香港實時全額結算系統（港元/美元）
    INTERNAL   // 內部系統調用
}
