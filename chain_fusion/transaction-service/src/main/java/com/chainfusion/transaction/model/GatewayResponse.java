package com.chainfusion.transaction.model;

import lombok.Data;
import java.time.Instant;

/**
 * 網關統一響應格式
 */
@Data
public class GatewayResponse {
    private boolean success;
    private String msgId;
    private String onChainHash;
    private String targetRoute;
    private String errorCode;
    private String errorMessage;
    private Instant processedAt;

    public static GatewayResponse ok(StandardMessage msg) {
        GatewayResponse r = new GatewayResponse();
        r.success = true;
        r.msgId = msg.getMsgId();
        r.onChainHash = msg.getOnChainHash();
        r.targetRoute = msg.getTargetRoute();
        r.processedAt = Instant.now();
        return r;
    }

    public static GatewayResponse fail(String errorCode, String errorMessage) {
        GatewayResponse r = new GatewayResponse();
        r.success = false;
        r.errorCode = errorCode;
        r.errorMessage = errorMessage;
        r.processedAt = Instant.now();
        return r;
    }
}
