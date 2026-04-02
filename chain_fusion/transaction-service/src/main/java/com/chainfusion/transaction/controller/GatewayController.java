package com.chainfusion.transaction.controller;

import com.chainfusion.transaction.model.*;
import com.chainfusion.transaction.service.GatewayCoreService;
import com.chainfusion.transaction.service.MonitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

/**
 * 網關核心 REST 控制器
 * APISIX 將請求路由至此（通過 transaction-service upstream）
 */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class GatewayController {

    private final GatewayCoreService gatewayCoreService;
    private final MonitorService     monitorService;

    /**
     * POST /api/v1/tx/submit — 提交單筆交易
     * APISIX 插件已完成：HMAC 鑒權、合規前置、鏈路由選擇
     */
    @PostMapping("/tx/submit")
    public ResponseEntity<GatewayResponse> submit(@RequestBody SubmitRequest body) {
        Request request = new Request();
        request.setMsgId(body.getMsgId());
        request.setRawContent(body.getRawContent());
        request.setExtensions(body.getExtensions());
        request.setReceivedAt(Instant.now());

        ChannelType channel = ChannelType.valueOf(body.getChannel().toUpperCase());
        GatewayResponse response = gatewayCoreService.receiveRequest(request, channel);

        return response.isSuccess()
            ? ResponseEntity.ok(response)
            : ResponseEntity.unprocessableEntity().body(response);
    }

    /**
     * POST /api/v1/tx/batch — 批量交易提交
     */
    @PostMapping("/tx/batch")
    public ResponseEntity<?> batch(@RequestBody java.util.List<SubmitRequest> items) {
        var results = items.stream().map(item -> {
            Request req = new Request();
            req.setMsgId(item.getMsgId());
            req.setRawContent(item.getRawContent());
            req.setExtensions(item.getExtensions());
            req.setReceivedAt(Instant.now());
            ChannelType ch = ChannelType.valueOf(item.getChannel().toUpperCase());
            return gatewayCoreService.receiveRequest(req, ch);
        }).toList();
        return ResponseEntity.ok(results);
    }

    /**
     * GET /api/v1/tx/status/{msgId} — 查詢交易狀態
     */
    @GetMapping("/tx/status/{msgId}")
    public ResponseEntity<?> status(@PathVariable String msgId) {
        // TODO: 從 DB 或 Redis 查詢交易狀態
        return ResponseEntity.ok(java.util.Map.of("msgId", msgId, "status", "PENDING"));
    }

    /**
     * GET /api/v1/monitor — 監控面板數據
     */
    @GetMapping("/monitor")
    public ResponseEntity<MonitorService.MonitorData> monitor() {
        return ResponseEntity.ok(monitorService.getMonitorData());
    }

    /** 請求體 DTO */
    @lombok.Data
    public static class SubmitRequest {
        private String msgId;
        private String channel;
        private String rawContent;
        private java.util.Map<String, String> extensions;
    }
}
