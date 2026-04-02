package com.chainfusion.compliance.identity;

/**
 * 身份信息（脫敏後用於合規校驗）
 */
public class IdentityInfo {
    private String did;
    private String maskedLegalId;  // 脫敏法定身份 ID
    private String bankAccountMasked;
    private String walletAddress;
    private boolean kycVerified;
    private String jurisdiction;   // 所屬司法轄區

    public String getDid() { return did; }
    public void setDid(String did) { this.did = did; }
    public String getMaskedLegalId() { return maskedLegalId; }
    public void setMaskedLegalId(String maskedLegalId) { this.maskedLegalId = maskedLegalId; }
    public String getBankAccountMasked() { return bankAccountMasked; }
    public void setBankAccountMasked(String bankAccountMasked) { this.bankAccountMasked = bankAccountMasked; }
    public String getWalletAddress() { return walletAddress; }
    public void setWalletAddress(String walletAddress) { this.walletAddress = walletAddress; }
    public boolean isKycVerified() { return kycVerified; }
    public void setKycVerified(boolean kycVerified) { this.kycVerified = kycVerified; }
    public String getJurisdiction() { return jurisdiction; }
    public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }
}
