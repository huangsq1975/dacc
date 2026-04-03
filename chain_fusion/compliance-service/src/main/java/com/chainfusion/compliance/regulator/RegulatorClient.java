package com.chainfusion.compliance.regulator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * 監管機構上報客戶端（code.md 四）
 *
 * 支持多目標監管機構：
 *   - PBOC  — 中國人民銀行跨境支付監管節點
 *   - HKMA  — 香港金融管理局實時監管接口
 *   - CROSS_BORDER — 跨境聯合監管節點
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RegulatorClient {

    private final RestTemplate restTemplate;

    @Value("${regulator.pboc.url:http://pboc-regulator/api/report}")
    private String pbocUrl;

    @Value("${regulator.hkma.url:http://hkma-regulator/api/report}")
    private String hkmaUrl;

    @Value("${regulator.cross-border.url:http://cross-border-regulator/api/report}")
    private String crossBorderUrl;

    /**
     * 向對應監管機構發送上報報文
     * 路由規則：
     *   - CNY 交易 → PBOC
     *   - HKD / HK_RTGS → HKMA
     *   - 跨境（SWIFT / mBridge）→ CROSS_BORDER（同時抄送 PBOC）
     */
    public void send(RegulatorReport report) {
        String type = report.getTransactionType();
        String currency = report.getCurrency();

        try {
            if ("HK_RTGS".equals(type) || "HKD".equals(currency)) {
                doSend(hkmaUrl, report, "HKMA");
            } else if ("SWIFT".equals(type) || "MBRIDGE".equals(type)) {
                doSend(crossBorderUrl, report, "CROSS_BORDER");
                doSend(pbocUrl, report, "PBOC");        // 跨境同時抄送人行
            } else {
                doSend(pbocUrl, report, "PBOC");
            }
            report.setStatus(RegulatorReport.ReportStatus.REPORTED);
        } catch (Exception e) {
            report.setStatus(RegulatorReport.ReportStatus.FAILED);
            log.error("[REGULATOR_CLIENT] send failed msgId={} type={}", report.getMsgId(), type, e);
        }
    }

    private void doSend(String url, RegulatorReport report, String target) {
        // TODO: 生產環境替換為 mTLS + 簽名認證
        restTemplate.postForObject(url, report, Map.class);
        log.info("[REGULATOR_CLIENT] reported to {} msgId={} channel={}",
            target, report.getMsgId(), report.getTransactionType());
    }
}
