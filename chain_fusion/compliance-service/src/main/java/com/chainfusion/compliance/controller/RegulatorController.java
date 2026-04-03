package com.chainfusion.compliance.controller;

import com.chainfusion.compliance.model.StandardMessage;
import com.chainfusion.compliance.regulator.RegulatorNodeService;
import com.chainfusion.compliance.regulator.RegulatorReport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * 監管節點 REST 控制器（code.md 四）
 *
 * 路徑均為 /internal/**，僅供 transaction-service 和監管機構內部調用，
 * 不暴露至 APISIX 公網路由。
 */
@Slf4j
@RestController
@RequestMapping("/internal/regulator")
@RequiredArgsConstructor
public class RegulatorController {

    private final RegulatorNodeService regulatorNodeService;

    /**
     * 上報監管節點（transaction-service 在每筆交易完成後調用）
     * 對應 code.md：RegulatorNode.report(msg)
     */
    @PostMapping("/report")
    public ResponseEntity<Map<String, String>> report(@RequestBody StandardMessage msg) {
        log.info("[REGULATOR_CTRL] report msgId={} channel={}", msg.getMsgId(), msg.getChannel());
        regulatorNodeService.report(msg);
        return ResponseEntity.ok(Map.of("status", "ok", "msgId", msg.getMsgId()));
    }

    /**
     * 按日期範圍查詢審計記錄（監管穿透式實時查詢）
     * 對應 code.md：RegulatorNode.queryByDate(start, end)
     *
     * @param start ISO-8601 格式，如 2026-01-01T00:00:00Z
     * @param end   ISO-8601 格式，如 2026-12-31T23:59:59Z
     */
    @GetMapping("/audit")
    public ResponseEntity<List<RegulatorReport>> queryAudit(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end) {
        log.info("[REGULATOR_CTRL] queryAudit start={} end={}", start, end);
        return ResponseEntity.ok(regulatorNodeService.queryByDate(start, end));
    }

    /**
     * 按 msgId 精確查詢（審計追溯）
     */
    @GetMapping("/audit/{msgId}")
    public ResponseEntity<List<RegulatorReport>> queryByMsgId(@PathVariable String msgId) {
        log.info("[REGULATOR_CTRL] queryByMsgId msgId={}", msgId);
        return ResponseEntity.ok(regulatorNodeService.queryByMsgId(msgId));
    }
}
