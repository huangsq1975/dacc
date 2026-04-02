package com.chainfusion.datasync.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 金融機構權限服務（stub — 生產環境對接機構白名單 / IAM 授權）
 */
@Slf4j
@Service
public class FinancialInstitutionService {

    /** 已授權托管資格的金融機構 ID 白名單（stub，生產環境從 DB / IAM 加載） */
    private final Set<String> authorizedInstitutions = ConcurrentHashMap.newKeySet();

    public boolean checkPermission(String financialInstitutionId) {
        // TODO: 從 IAM / 機構授權表校驗托管資格
        // stub: 默認 true，方便本地開發；生產環境需替換為真實校驗
        log.info("[FI_SERVICE] checkPermission institutionId={}", financialInstitutionId);
        return true;
    }

    public void grantPermission(String financialInstitutionId) {
        authorizedInstitutions.add(financialInstitutionId);
    }

    public void revokePermission(String financialInstitutionId) {
        authorizedInstitutions.remove(financialInstitutionId);
    }
}
