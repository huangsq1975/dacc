package com.chainfusion.datasync.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * 同步日誌服務（in-memory stub，生產環境替換為 DB 持久化）
 */
@Slf4j
@Service
public class SyncLogService {

    private final List<LogEntry> logs = new CopyOnWriteArrayList<>();

    public void save(String event, String targetId, String detail) {
        LogEntry entry = new LogEntry(event, targetId, detail, Instant.now());
        logs.add(entry);
        log.info("[SYNC_LOG] event={} targetId={} detail={}", event, targetId, detail);
    }

    public List<LogEntry> queryByTarget(String targetId) {
        return logs.stream()
            .filter(e -> targetId.equals(e.targetId()))
            .toList();
    }

    public record LogEntry(String event, String targetId, String detail, Instant timestamp) {}
}
