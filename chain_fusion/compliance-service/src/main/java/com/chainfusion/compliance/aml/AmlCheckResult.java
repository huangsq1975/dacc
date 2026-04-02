package com.chainfusion.compliance.aml;

import java.util.List;

/**
 * AML 校驗結果
 */
public class AmlCheckResult {

    public enum RiskLevel {
        LOW,      // 低風險，直接通過
        MEDIUM,   // 中風險，標記後通過
        HIGH,     // 高風險，需人工審核
        BLOCKED   // 攔截，拒絕交易
    }

    private String requestId;
    private boolean passed;
    private RiskLevel riskLevel;
    private List<String> violations;  // 違規說明列表
    private String reportId;          // 合規記錄 ID（用於審計追溯）

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }
    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public List<String> getViolations() { return violations; }
    public void setViolations(List<String> violations) { this.violations = violations; }
    public String getReportId() { return reportId; }
    public void setReportId(String reportId) { this.reportId = reportId; }
}
