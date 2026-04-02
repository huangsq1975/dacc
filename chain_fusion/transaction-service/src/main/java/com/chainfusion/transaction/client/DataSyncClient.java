package com.chainfusion.transaction.client;

import com.chainfusion.transaction.model.StandardMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;

/**
 * 數據同步服務客戶端——調用 data-sync-service
 */
@Component
public class DataSyncClient {

    private final RestTemplate restTemplate;

    @Value("${services.datasync.url:http://data-sync-service:8080}")
    private String dataSyncBaseUrl;

    public DataSyncClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /** 觸發鏈下數據→上鏈存證 */
    public void syncToChain(StandardMessage msg) {
        post("/internal/sync/to-chain", msg);
    }

    /** 觸發鏈上確認→鏈下同步 */
    public void syncToOffChain(StandardMessage msg) {
        post("/internal/sync/to-offchain", msg);
    }

    /** 觸發托管錢包資產同步（有 walletId 時調用） */
    public void syncToCustody(StandardMessage msg) {
        String walletId = msg.getExtension().get("walletId");
        if (walletId == null || walletId.isBlank()) return;
        post("/internal/sync/to-custody", msg);
    }

    private void post(String path, Object body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Internal-Call", "transaction-service");
        restTemplate.exchange(
            dataSyncBaseUrl + path, HttpMethod.POST,
            new HttpEntity<>(body, headers), Void.class
        );
    }
}
