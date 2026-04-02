package com.chainfusion.transaction.service;

import com.chainfusion.transaction.model.RouteResult;
import com.chainfusion.transaction.model.StandardMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * 業務路由服務（code.md 六）
 * 根據貨幣類型、業務場景自動選擇最優清算鏈路
 *
 * 路由規則（優先級依序）：
 *   1. 人民幣跨境       → CIPS
 *   2. 數字貨幣 / CBDC  → mBridge（鏈上）
 *   3. 港元/美元 + 香港渠道 → HK_RTGS
 *   4. 其他國際常規     → SWIFT
 *
 * 注意：基礎設施層路由（節點健康度選擇）由 route-engine（Go）負責；
 *       本服務負責業務層路由（選擇哪個清算系統）。
 */
@Slf4j
@Service
public class RouterService {

    private static final Set<String> HK_USD_CURRENCIES = Set.of("HKD", "USD");

    /**
     * 選擇最優路由（對應 code.md：RouterService.selectBestRoute）
     */
    public RouteResult selectBestRoute(StandardMessage msg) {
        RouteResult route = new RouteResult();

        // 規則 1：人民幣跨境 → CIPS
        if ("CNY".equalsIgnoreCase(msg.getCurrency()) && msg.isCrossBorder()) {
            route.setTarget("CIPS");
            route.setOnChain(false);
            route.setReason("CNY cross-border payment routed to CIPS");

        // 規則 2：數字貨幣 / CBDC → mBridge（鏈上）
        } else if (msg.isCbdc() || isCBDCCurrency(msg.getCurrency())) {
            route.setTarget("mBridge");
            route.setOnChain(true);
            route.setReason("CBDC/digital currency routed to mBridge on-chain");

        // 規則 3：港元/美元 + 香港渠道 → HK_RTGS
        } else if (HK_USD_CURRENCIES.contains(msg.getCurrency().toUpperCase()) && msg.isHKChannel()) {
            route.setTarget("HK_RTGS");
            route.setOnChain(false);
            route.setReason("HKD/USD Hong Kong channel routed to HK_RTGS");

        // 規則 4：國際常規 → SWIFT
        } else {
            route.setTarget("SWIFT");
            route.setOnChain(false);
            route.setReason("Default international payment routed to SWIFT");
        }

        msg.setTargetRoute(route.getTarget());
        log.info("[ROUTER] msgId={} currency={} target={} reason={}",
            msg.getMsgId(), msg.getCurrency(), route.getTarget(), route.getReason());

        return route;
    }

    private boolean isCBDCCurrency(String currency) {
        if (currency == null) return false;
        String c = currency.toUpperCase();
        return c.startsWith("ECNY") || c.startsWith("CBDC") || c.startsWith("DIGITAL");
    }
}
