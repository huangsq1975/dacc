package com.chainfusion.datasync.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 監控告警服務（stub — 生產環境對接 WeCom / 企業郵件 / SMS）
 */
@Slf4j
@Service
public class MonitorNotificationService {

    public void alert(RuntimeException ex) {
        // TODO: POST 告警至 WeCom webhook / PagerDuty / 釘釘
        log.error("[MONITOR] ALERT: {}", ex.getMessage(), ex);
    }
}
