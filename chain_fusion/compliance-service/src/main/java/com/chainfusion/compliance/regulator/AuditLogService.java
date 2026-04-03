package com.chainfusion.compliance.regulator;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * 審計日誌服務（code.md 四）
 *
 * 職責：
 *   - 持久化每筆監管上報記錄，留痕 7 年
 *   - 支持按日期範圍查詢（監管穿透式查詢接口）
 *
 * 生產環境：替換為 DB 持久化（JPA / MyBatis），並配置 7 年數據保留策略
 */
@Slf4j
@Service
public class AuditLogService {

    /** in-memory stub，生產環境替換為 DB 持久化 */
    private final List<RegulatorReport> auditLogs = new CopyOnWriteArrayList<>();

    /**
     * 保存監管上報記錄（7 年留痕）
     */
    public void save(RegulatorReport report) {
        auditLogs.add(report);
        log.info("[AUDIT] saved msgId={} type={} payer={} payee={} amount={} {}",
            report.getMsgId(), report.getTransactionType(),
            report.getPayer(), report.getPayee(),
            report.getAmount(), report.getCurrency());
    }

    /**
     * 按時間範圍查詢審計記錄（監管穿透式查詢）
     */
    public List<RegulatorReport> query(Instant start, Instant end) {
        return auditLogs.stream()
            .filter(r -> r.getTimestamp() != null
                && !r.getTimestamp().isBefore(start)
                && !r.getTimestamp().isAfter(end))
            .toList();
    }

    /**
     * 按 msgId 查詢
     */
    public List<RegulatorReport> queryByMsgId(String msgId) {
        return auditLogs.stream()
            .filter(r -> msgId.equals(r.getMsgId()))
            .toList();
    }

    /**
     * 按渠道類型查詢
     */
    public List<RegulatorReport> queryByType(String transactionType) {
        return auditLogs.stream()
            .filter(r -> transactionType.equals(r.getTransactionType()))
            .toList();
    }
}
