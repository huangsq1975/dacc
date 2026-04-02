package com.chainfusion.transaction.client;

import com.chainfusion.transaction.model.StandardMessage;
import org.springframework.stereotype.Component;

/**
 * 區塊鏈客戶端——對接 protocol-adapter 服務
 * 通過 protocol-adapter 的 SPI 插件體系路由至 Conflux/ETH/BSC/CIPS 聯盟鏈
 */
@Component
public class BlockchainClient {

    // TODO: 注入 protocol-adapter 的 REST/gRPC 客戶端

    /**
     * 將交易上鏈
     *
     * @param msg 標準報文
     * @return 鏈上交易哈希
     */
    public String sendToChain(StandardMessage msg) {
        // TODO: 調用 protocol-adapter /api/v1/chain/send
        // 根據 msg.getTargetRoute() 選擇目標鏈（Conflux/ETH/BSC）
        throw new UnsupportedOperationException("not implemented: call protocol-adapter");
    }

    /**
     * 查詢交易收據（確認狀態、區塊哈希、確認時間）
     *
     * @param msgId 報文 ID（映射為鏈上 txHash）
     * @return 鏈上收據
     */
    public ChainReceipt getReceipt(String msgId) {
        // TODO: 調用 protocol-adapter /api/v1/chain/receipt/{txHash}
        throw new UnsupportedOperationException("not implemented");
    }
}
