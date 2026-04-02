package com.chainfusion.transaction.service;

import com.chainfusion.transaction.model.ChannelType;
import com.chainfusion.transaction.model.Request;
import com.chainfusion.transaction.model.StandardMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;

/**
 * 協議轉換服務（transaction-service 內部代理）
 * 委派給 bank-adapter 中的 ProtocolConverter 執行實際轉換
 */
@Service
public class ProtocolConverterService {

    private final RestTemplate restTemplate;

    @Value("${services.bankadapter.url:http://bank-adapter:8080}")
    private String bankAdapterUrl;

    public ProtocolConverterService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * 協議轉換入口：調用 bank-adapter /api/v1/convert
     * 對應 code.md：ProtocolConverter.convert()
     */
    public StandardMessage convert(Request request, ChannelType channel) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Internal-Call", "transaction-service");

        var payload = new java.util.HashMap<String, Object>();
        payload.put("channel", channel.name());
        payload.put("msgId", request.getMsgId());
        payload.put("rawContent", request.getRawContent());
        payload.put("extensions", request.getExtensions());

        ResponseEntity<StandardMessage> resp = restTemplate.exchange(
            bankAdapterUrl + "/api/v1/convert",
            HttpMethod.POST,
            new HttpEntity<>(payload, headers),
            StandardMessage.class
        );

        if (resp.getBody() == null) {
            throw new RuntimeException("ProtocolConverter returned null for msgId=" + request.getMsgId());
        }
        return resp.getBody();
    }
}
