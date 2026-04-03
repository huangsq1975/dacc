package com.chainfusion.compliance.regulator;

import com.chainfusion.compliance.model.StandardMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

/**
 * 監管節點服務（code.md 四：RegulatorNode）
 *
 * 職責：
 *   1. report()  — 接收交易報文 → 組裝 RegulatorReport → 上報監管機構 → 審計留痕 7 年
 *   2. queryByDate() — 按日期範圍查詢審計記錄（供監管穿透式實時查詢）
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RegulatorNodeService {

    private final RegulatorClient  regulatorClient;
    private final AuditLogService  auditLogService;

    /**
     * 統一上報監管節點
     * 對應 code.md：RegulatorNode.report(StandardMessage msg)
     */
    public void report(StandardMessage msg) {
        RegulatorReport report = new RegulatorReport();
        report.setMsgId(msg.getMsgId());
        report.setTransactionType(msg.getChannel());
        report.setPayer(msg.getPayer());
        report.setPayee(msg.getPayee());
        report.setAmount(msg.getAmount());
        report.setCurrency(msg.getCurrency());
        report.setHash(msg.getOnChainHash());
        report.setTimestamp(Instant.now());
        report.setRawData(msg.getRawData());
        report.setStatus(RegulatorReport.ReportStatus.PENDING);

        // 上報監管機構（人行 / 香港金管局 / 跨境監管節點）
        regulatorClient.send(report);

        // 留痕 7 年
        auditLogService.save(report);

        log.info("[REGULATOR_NODE] reported msgId={} channel={} status={}",
            msg.getMsgId(), msg.getChannel(), report.getStatus());
    }

    /**
     * 監管查詢接口（監管可實時查）
     * 對應 code.md：RegulatorNode.queryByDate(Date start, Date end)
     */
    public List<RegulatorReport> queryByDate(Instant start, Instant end) {
        return auditLogService.query(start, end);
    }

    /**
     * 按 msgId 精確查詢（審計追溯）
     */
    public List<RegulatorReport> queryByMsgId(String msgId) {
        return auditLogService.queryByMsgId(msgId);
    }
}
