package com.chainfusion.datasync.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 密鑰管理服務（stub — 生產環境對接 HSM / Thales / CloudHSM）
 */
@Slf4j
@Service
public class KeyService {

    /** keyId → chainAddress 映射（stub，生產環境從 HSM 讀取） */
    private final Map<String, String> keyAddressMap = new ConcurrentHashMap<>();

    /**
     * 將密鑰 ID 與鏈上地址綁定（HSM 硬件存儲）
     */
    public void bindKeyAndAddress(String keyId, String chainAddress) {
        // TODO: 調用 hotwallet HSM API 綁定密鑰與地址
        keyAddressMap.put(keyId, chainAddress);
        log.info("[KEY_SERVICE] bound keyId={} chainAddress={}", keyId, chainAddress);
    }

    /**
     * 查詢密鑰綁定的鏈上地址
     */
    public String getChainAddress(String keyId) {
        return keyAddressMap.get(keyId);
    }
}
