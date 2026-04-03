package com.chainfusion.compliance.controller;

import com.chainfusion.compliance.model.StandardMessage;
import com.chainfusion.compliance.service.ComplianceCheckService;
import com.chainfusion.compliance.service.ComplianceCheckService.CheckResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 合規校驗 REST 控制器
 *
 * /internal/compliance/check  — transaction-service ComplianceClient 調用
 * /internal/compliance/precheck — APISIX compliance-precheck Lua 插件調用
 */
@Slf4j
@RestController
@RequestMapping("/internal/compliance")
@RequiredArgsConstructor
public class ComplianceController {

    private final ComplianceCheckService complianceCheckService;

    /**
     * 合規前置校驗（transaction-service 同步調用）
     * 返回 200 = PASS，422 = BLOCK，202 = REVIEW
     */
    @PostMapping("/check")
    public ResponseEntity<Map<String, String>> check(@RequestBody StandardMessage msg) {
        log.info("[COMPLIANCE_CTRL] check msgId={}", msg.getMsgId());
        CheckResult result = complianceCheckService.check(msg);

        Map<String, String> body = Map.of(
            "result",    result.result(),
            "riskLevel", result.riskLevel(),
            "detail",    result.detail(),
            "msgId",     msg.getMsgId()
        );

        if ("BLOCK".equals(result.result())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(body);
        } else if ("REVIEW".equals(result.result())) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
        }
        return ResponseEntity.ok(body);
    }

    /**
     * APISIX Lua 插件快速前置校驗（無需完整 StandardMessage，只需關鍵字段）
     */
    @PostMapping("/precheck")
    public ResponseEntity<Map<String, String>> precheck(@RequestBody Map<String, String> req) {
        // 從 APISIX 插件轉發的精簡請求（payer/payee/amount/currency）
        StandardMessage msg = new StandardMessage();
        msg.setMsgId(req.getOrDefault("msgId", "unknown"));
        msg.setPayer(req.get("payer"));
        msg.setPayee(req.get("payee"));
        msg.setCurrency(req.get("currency"));
        String amountStr = req.get("amount");
        if (amountStr != null) {
            try { msg.setAmount(new java.math.BigDecimal(amountStr)); } catch (NumberFormatException ignored) {}
        }

        CheckResult result = complianceCheckService.check(msg);
        Map<String, String> body = Map.of(
            "result",    result.result(),
            "riskLevel", result.riskLevel(),
            "detail",    result.detail()
        );

        if ("BLOCK".equals(result.result())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(body);
        }
        return ResponseEntity.ok(body);
    }
}
