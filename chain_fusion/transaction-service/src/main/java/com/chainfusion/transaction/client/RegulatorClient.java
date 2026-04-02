package com.chainfusion.transaction.client;

import com.chainfusion.transaction.model.StandardMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;

/**
 * 監管節點客戶端——調用 compliance-service RegulatorNode
 */
@Component
public class RegulatorClient {

    private final RestTemplate restTemplate;

    @Value("${services.compliance.url:http://compliance-service:8080}")
    private String complianceBaseUrl;

    public RegulatorClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /** 向監管節點上報交易（人行/香港金管局/跨境監管節點） */
    public void report(StandardMessage msg) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Internal-Call", "transaction-service");
        try {
            restTemplate.exchange(
                complianceBaseUrl + "/internal/regulator/report",
                HttpMethod.POST,
                new HttpEntity<>(msg, headers),
                Void.class
            );
        } catch (Exception e) {
            // 監管上報失敗不影響業務流程，但必須告警
            throw new RuntimeException("Regulator report failed for msgId=" + msg.getMsgId(), e);
        }
    }
}
