package com.chainfusion.transaction.client;

public class ComplianceException extends RuntimeException {
    private final String riskLevel;
    private final String detail;

    public ComplianceException(String message, String riskLevel, String detail) {
        super(message);
        this.riskLevel = riskLevel;
        this.detail = detail;
    }

    public String getRiskLevel() { return riskLevel; }
    public String getDetail()    { return detail; }
}
