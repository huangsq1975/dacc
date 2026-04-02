package com.chainfusion.transaction.client;

import com.chainfusion.transaction.model.StandardMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;

import java.util.Map;

/**
 * 合規服務客戶端——同步調用 compliance-service AML/CFT 校驗
 */
@Component
public class ComplianceClient {

    private final RestTemplate restTemplate;

    @Value("${services.compliance.url:http://compliance-service:8080}")
    private String complianceBaseUrl;

    public ComplianceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * 執行合規校驗（AML/CFT + 制裁名單）
     * 校驗不通過時拋出 ComplianceException
     *
     * @param msg 標準報文
     */
    public void check(StandardMessage msg) {
        Map<String, Object> payload = Map.of(
            "request_id",       msg.getMsgId(),
            "sender_wallet",    msg.getPayer(),
            "receiver_wallet",  msg.getPayee(),
            "amount",           msg.getAmount(),
            "currency",         msg.getCurrency(),
            "jurisdiction",     msg.getExtension().getOrDefault("jurisdiction", "GLOBAL")
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Internal-Call", "transaction-service");

        ResponseEntity<Map> response = restTemplate.exchange(
            complianceBaseUrl + "/internal/compliance/check",
            HttpMethod.POST,
            new HttpEntity<>(payload, headers),
            Map.class
        );

        if (response.getBody() == null || Boolean.FALSE.equals(response.getBody().get("passed"))) {
            String riskLevel  = response.getBody() != null ? (String) response.getBody().get("risk_level") : "UNKNOWN";
            throw new ComplianceException("Compliance check failed: risk=" + riskLevel,
                                          riskLevel,
                                          response.getBody() != null ? response.getBody().toString() : "");
        }
    }
}
