package com.chainfusion.transaction.service;

import com.chainfusion.transaction.model.ChannelType;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 監控服務（code.md 五）
 * 記錄請求量、成功率、延遲；異常時多渠道告警（郵件/短信/企業微信）
 */
@Slf4j
@Service
public class MonitorService {

    private final MeterRegistry meterRegistry;
    private final RestTemplate restTemplate;
    private final Map<String, Counter>   requestCounters  = new ConcurrentHashMap<>();
    private final Map<String, Counter>   successCounters  = new ConcurrentHashMap<>();
    private final Map<String, Counter>   errorCounters    = new ConcurrentHashMap<>();
    private final Map<String, Timer>     responseTimers   = new ConcurrentHashMap<>();
    private final Map<String, AtomicLong> volumeMap       = new ConcurrentHashMap<>();

    @Value("${alert.wecom.webhook:}")
    private String wecomWebhook;

    @Value("${alert.email.endpoint:}")
    private String emailEndpoint;

    @Value("${alert.sms.endpoint:}")
    private String smsEndpoint;

    public MonitorService(MeterRegistry meterRegistry, RestTemplate restTemplate) {
        this.meterRegistry = meterRegistry;
        this.restTemplate  = restTemplate;
    }

    /**
     * 記錄請求量、成功率、延遲（Micrometer → Prometheus）
     * 對應 code.md：MonitorService.recordRequest()
     */
    public void recordRequest(ChannelType channel, String msgId) {
        String channelName = channel.name().toLowerCase();

        // 請求計數器
        requestCounters.computeIfAbsent(channelName, c ->
            Counter.builder(c + "_request_total")
                   .description("Total requests for channel " + c)
                   .register(meterRegistry)
        ).increment();

        // 渠道交易量（用於 getMonitorData）
        volumeMap.computeIfAbsent(channelName, k -> new AtomicLong(0)).incrementAndGet();

        log.debug("[MONITOR] recordRequest channel={} msgId={}", channel, msgId);
    }

    /**
     * 記錄請求處理時長
     */
    public void recordLatency(ChannelType channel, long startNanos) {
        String channelName = channel.name().toLowerCase();
        long elapsed = System.nanoTime() - startNanos;
        responseTimers.computeIfAbsent(channelName, c ->
            Timer.builder(c + "_response_time")
                 .description("Response time for channel " + c)
                 .register(meterRegistry)
        ).record(elapsed, TimeUnit.NANOSECONDS);
    }

    /** 記錄成功 */
    public void recordSuccess(ChannelType channel) {
        String channelName = channel.name().toLowerCase();
        successCounters.computeIfAbsent(channelName, c ->
            Counter.builder(c + "_success_total").register(meterRegistry)
        ).increment();
    }

    /**
     * 實時監控面板數據
     * 對應 code.md：MonitorService.getMonitorData()
     */
    public MonitorData getMonitorData() {
        MonitorData data = new MonitorData();
        data.setTotalTx(getTxCount());
        data.setSuccessRate(getSuccessRate());
        data.setDelayAvg(getAvgDelay());
        data.setCipsVolume(getChannelVolume("cips"));
        data.setSwiftVolume(getChannelVolume("swift"));
        data.setMbridgeVolume(getChannelVolume("mbridge"));
        data.setHkRtgsVolume(getChannelVolume("hk_rtgs"));
        data.setChainSyncStatus(getChainSyncStatus());
        data.setTimestamp(Instant.now());
        return data;
    }

    /**
     * 異常告警——多渠道（郵件/短信/企業微信）
     * 對應 code.md：MonitorService.alert()
     */
    public void alert(Exception e) {
        // 錯誤計數
        Counter.builder("error_total")
               .description("Total gateway errors")
               .register(meterRegistry)
               .increment();

        String message = "網關異常：" + e.getMessage();
        log.error("[ALERT] {}", message, e);

        sendWeComAlert(message);
        sendEmailAlert(message);
        sendSmsAlert(message);
    }

    // ── 私有方法 ──────────────────────────────────────────────────

    private long getTxCount() {
        return volumeMap.values().stream().mapToLong(AtomicLong::get).sum();
    }

    private double getSuccessRate() {
        double total   = meterRegistry.find("cips_request_total").counters().stream()
                           .mapToDouble(Counter::count).sum()
                       + meterRegistry.find("swift_request_total").counters().stream()
                           .mapToDouble(Counter::count).sum();
        double success = meterRegistry.find("cips_success_total").counters().stream()
                           .mapToDouble(Counter::count).sum()
                       + meterRegistry.find("swift_success_total").counters().stream()
                           .mapToDouble(Counter::count).sum();
        return total > 0 ? success / total * 100 : 100.0;
    }

    private double getAvgDelay() {
        // 從 Prometheus Timer 讀取平均延遲（毫秒）
        return responseTimers.values().stream()
            .mapToDouble(t -> t.mean(TimeUnit.MILLISECONDS))
            .average().orElse(0.0);
    }

    private long getChannelVolume(String channel) {
        return volumeMap.getOrDefault(channel, new AtomicLong(0)).get();
    }

    private String getChainSyncStatus() {
        // TODO: 查詢 data-sync-service 最後同步狀態
        return "SYNCED";
    }

    private void sendWeComAlert(String message) {
        if (wecomWebhook == null || wecomWebhook.isBlank()) return;
        try {
            restTemplate.postForEntity(wecomWebhook,
                Map.of("msgtype", "text", "text", Map.of("content", message)), Void.class);
        } catch (Exception ex) {
            log.warn("[ALERT] WeCom send failed: {}", ex.getMessage());
        }
    }

    private void sendEmailAlert(String message) {
        if (emailEndpoint == null || emailEndpoint.isBlank()) return;
        try {
            restTemplate.postForEntity(emailEndpoint, Map.of("subject", "網關告警", "body", message), Void.class);
        } catch (Exception ex) {
            log.warn("[ALERT] Email send failed: {}", ex.getMessage());
        }
    }

    private void sendSmsAlert(String message) {
        if (smsEndpoint == null || smsEndpoint.isBlank()) return;
        try {
            restTemplate.postForEntity(smsEndpoint, Map.of("message", message), Void.class);
        } catch (Exception ex) {
            log.warn("[ALERT] SMS send failed: {}", ex.getMessage());
        }
    }

    // ── 監控數據模型 ──────────────────────────────────────────────

    @Data
    public static class MonitorData {
        private long    totalTx;
        private double  successRate;
        private double  delayAvg;
        private long    cipsVolume;
        private long    swiftVolume;
        private long    mbridgeVolume;
        private long    hkRtgsVolume;
        private String  chainSyncStatus;
        private Instant timestamp;
    }
}
