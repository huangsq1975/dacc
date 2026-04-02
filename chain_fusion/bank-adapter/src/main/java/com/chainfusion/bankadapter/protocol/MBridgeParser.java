package com.chainfusion.bankadapter.protocol;

import com.chainfusion.bankadapter.model.MBridgeMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.Map;

/**
 * mBridge 報文解析器（JSON 格式）
 * mBridge 使用 JSON-RPC，與以太坊 ABI 編碼兼容
 */
public class MBridgeParser {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * 解析 mBridge JSON 報文 → MBridgeMessage
     *
     * 典型 JSON 格式：
     * {
     *   "txHash":        "0xabc...",
     *   "payerWallet":   "0x123...",
     *   "payeeWallet":   "0x456...",
     *   "cbdcAmount":    "1000.00",
     *   "currency":      "eCNY",
     *   "sourceChain":   "mBridge-CN",
     *   "targetChain":   "mBridge-HK",
     *   "contractAddress": "0x789..."
     * }
     */
    @SuppressWarnings("unchecked")
    public static MBridgeMessage parse(String jsonContent) {
        MBridgeMessage msg = new MBridgeMessage();
        try {
            Map<String, Object> map = MAPPER.readValue(jsonContent, Map.class);
            msg.setTxHash((String) map.get("txHash"));
            msg.setPayerWallet((String) map.get("payerWallet"));
            msg.setPayeeWallet((String) map.get("payeeWallet"));
            msg.setCurrency((String) map.getOrDefault("currency", "eCNY"));
            msg.setSourceChain((String) map.get("sourceChain"));
            msg.setTargetChain((String) map.get("targetChain"));
            msg.setContractAddress((String) map.get("contractAddress"));

            Object amt = map.get("cbdcAmount");
            if (amt != null) {
                msg.setCbdcAmount(new BigDecimal(amt.toString()));
            }
            if (map.containsKey("blockNumber")) {
                msg.setBlockNumber(Long.valueOf(map.get("blockNumber").toString()));
                msg.setConfirmed(true);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse mBridge JSON: " + e.getMessage(), e);
        }
        return msg;
    }
}
