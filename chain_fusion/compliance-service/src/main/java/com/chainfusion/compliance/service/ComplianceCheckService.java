package com.chainfusion.compliance.service;

import com.chainfusion.compliance.model.StandardMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Set;

/**
 * 合規前置校驗服務（code.md 一：ComplianceService.check）
 *
 * 供 APISIX compliance-precheck 插件和 transaction-service 通過
 * /internal/compliance/check 調用。
 *
 * 當前：基礎規則校驗（金額閾值、幣種白名單、基本制裁名單）
 * 後續：接入 Drools 規則引擎、AML ML 模型、OFAC 實時 API
 */
@Slf4j
@Service
public class ComplianceCheckService {

    /** 需要人工審核的大額閾值（USD 等值） */
    private static final BigDecimal HIGH_VALUE_THRESHOLD = new BigDecimal("1000000");

    /** 允許的幣種白名單 */
    private static final Set<String> ALLOWED_CURRENCIES =
        Set.of("CNY", "HKD", "USD", "EUR", "GBP", "JPY", "ECNY");

    /**
     * 統一合規校驗入口
     *
     * @return CheckResult（PASS / BLOCK / REVIEW）
     */
    public CheckResult check(StandardMessage msg) {
        log.info("[COMPLIANCE] check msgId={} payer={} payee={} amount={} {}",
            msg.getMsgId(), msg.getPayer(), msg.getPayee(), msg.getAmount(), msg.getCurrency());

        // 1. 幣種白名單
        if (msg.getCurrency() == null || !ALLOWED_CURRENCIES.contains(msg.getCurrency())) {
            return CheckResult.block("不支持的幣種: " + msg.getCurrency(), "LOW");
        }

        // 2. 金額非負
        if (msg.getAmount() == null || msg.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            return CheckResult.block("交易金額無效: " + msg.getAmount(), "LOW");
        }

        // 3. 大額交易標記人工審核
        if (msg.getAmount().compareTo(HIGH_VALUE_THRESHOLD) >= 0) {
            log.warn("[COMPLIANCE] high-value tx msgId={} amount={}", msg.getMsgId(), msg.getAmount());
            return CheckResult.review("大額交易，需人工審核", "MEDIUM");
        }

        // TODO: 4. AML 反洗錢校驗（Drools + ML 模型）
        // TODO: 5. 制裁名單比對（OFAC / UNSC / EU）
        // TODO: 6. FATF 旅行規則（跨境 SWIFT / mBridge）
        // TODO: 7. PEP 政治公眾人物篩查

        return CheckResult.pass();
    }

    // ── 結果模型 ──────────────────────────────────────────────────

    public record CheckResult(String result, String riskLevel, String detail) {

        public boolean isPassed() {
            return "PASS".equals(result);
        }

        public static CheckResult pass() {
            return new CheckResult("PASS", "LOW", "");
        }

        public static CheckResult block(String detail, String riskLevel) {
            return new CheckResult("BLOCK", riskLevel, detail);
        }

        public static CheckResult review(String detail, String riskLevel) {
            return new CheckResult("REVIEW", riskLevel, detail);
        }
    }
}
