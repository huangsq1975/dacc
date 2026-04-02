package com.chainfusion.datasync.controller;

import com.chainfusion.datasync.model.StandardMessage;
import com.chainfusion.datasync.service.CustodySystemService;
import com.chainfusion.datasync.service.DataSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 數據同步服務 REST 控制器
 *
 * 供 transaction-service 內部調用，均為 /internal/** 路徑（不暴露至 APISIX 公網）
 */
@Slf4j
@RestController
@RequestMapping("/internal/sync")
@RequiredArgsConstructor
public class DataSyncController {

    private final DataSyncService         dataSyncService;
    private final CustodySystemService    custodySystemService;

    /**
     * 鏈下數據 → 上鏈存證（code.md §3：syncToChain）
     */
    @PostMapping("/to-chain")
    public ResponseEntity<Map<String, String>> syncToChain(@RequestBody StandardMessage msg) {
        log.info("[CTRL] syncToChain msgId={}", msg.getMsgId());
        dataSyncService.syncToChain(msg);
        return ResponseEntity.ok(Map.of("status", "ok", "msgId", msg.getMsgId()));
    }

    /**
     * 鏈上確認 → 鏈下同步（code.md §3：syncToOffChain）
     */
    @PostMapping("/to-offchain")
    public ResponseEntity<Map<String, String>> syncToOffChain(@RequestBody StandardMessage msg) {
        log.info("[CTRL] syncToOffChain msgId={}", msg.getMsgId());
        dataSyncService.syncToOffChain(msg);
        return ResponseEntity.ok(Map.of("status", "ok", "msgId", msg.getMsgId()));
    }

    /**
     * 觸發托管錢包資產同步（code.md §7.2：syncToCustodySystem）
     */
    @PostMapping("/to-custody")
    public ResponseEntity<Map<String, String>> syncToCustody(@RequestBody StandardMessage msg) {
        log.info("[CTRL] syncToCustody msgId={}", msg.getMsgId());
        dataSyncService.syncToCustodySystem(msg);
        return ResponseEntity.ok(Map.of("status", "ok", "msgId", msg.getMsgId()));
    }

    /**
     * 批量同步所有托管錢包（定時任務可調用）
     */
    @PostMapping("/custody/sync-all")
    public ResponseEntity<Map<String, String>> syncAllWallets() {
        log.info("[CTRL] syncAllWallets");
        custodySystemService.syncCustodyWalletWithChain();
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    /**
     * 查詢托管錢包資產（code.md §7：queryWalletAsset）
     */
    @GetMapping("/custody/wallet/{walletId}")
    public ResponseEntity<CustodySystemService.CustodyWalletQueryResult> queryWallet(
            @PathVariable String walletId) {
        log.info("[CTRL] queryWallet walletId={}", walletId);
        return ResponseEntity.ok(custodySystemService.queryWalletAsset(walletId));
    }

    /**
     * 初始化托管錢包（code.md §7：initCustodyWallet）
     */
    @PostMapping("/custody/wallet/init")
    public ResponseEntity<Map<String, String>> initWallet(@RequestBody Map<String, String> req) {
        String institutionId = req.get("financialInstitutionId");
        String walletId      = req.get("walletId");
        String chainAddress  = req.get("chainAddress");
        String keyId         = req.get("keyId");

        custodySystemService.initCustodyWallet(institutionId, walletId, chainAddress, keyId);
        log.info("[CTRL] initWallet walletId={} institution={}", walletId, institutionId);
        return ResponseEntity.ok(Map.of("status", "ok", "walletId", walletId));
    }
}
