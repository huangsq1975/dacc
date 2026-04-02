package com.chainfusion.compliance.aml;

/**
 * AML 校驗請求
 */
public class AmlCheckRequest {
    private String requestId;
    private String senderDid;        // 發送方 DID
    private String receiverDid;      // 接收方 DID
    private String senderWallet;     // 發送方錢包地址
    private String receiverWallet;   // 接收方錢包地址
    private double amount;
    private String currency;
    private String purpose;          // 交易用途
    private String jurisdiction;     // EU / CN / HK / GLOBAL / BRICS

    // Getters and Setters
    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }
    public String getSenderDid() { return senderDid; }
    public void setSenderDid(String senderDid) { this.senderDid = senderDid; }
    public String getReceiverDid() { return receiverDid; }
    public void setReceiverDid(String receiverDid) { this.receiverDid = receiverDid; }
    public String getSenderWallet() { return senderWallet; }
    public void setSenderWallet(String senderWallet) { this.senderWallet = senderWallet; }
    public String getReceiverWallet() { return receiverWallet; }
    public void setReceiverWallet(String receiverWallet) { this.receiverWallet = receiverWallet; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getJurisdiction() { return jurisdiction; }
    public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }
}
