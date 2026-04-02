package com.chainfusion.transaction.service;

import com.chainfusion.transaction.model.ChannelType;
import com.chainfusion.transaction.model.Request;
import org.springframework.stereotype.Component;

/**
 * 基礎請求校驗：格式、簽名、權限
 * APISIX 已做 HMAC 鑒權，此處做業務層二次校驗
 */
@Component
public class RequestValidator {

    public void validate(Request request, ChannelType channel) {
        if (request.getMsgId() == null || request.getMsgId().isBlank()) {
            throw new ValidationException("msgId is required");
        }
        if (channel == null) {
            throw new ValidationException("channel is required");
        }
        if (request.getRawContent() == null && request.getRawPayload() == null) {
            throw new ValidationException("rawContent or rawPayload is required");
        }
        // TODO: 校驗簽名（ECDSA / SM2）
        // TODO: 校驗發送方權限（對接 admin-service 權限系統）
    }
}
