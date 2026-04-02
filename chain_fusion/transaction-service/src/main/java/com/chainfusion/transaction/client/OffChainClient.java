package com.chainfusion.transaction.client;

import com.chainfusion.transaction.model.StandardMessage;
import org.springframework.stereotype.Component;

/**
 * 鏈下金融機構客戶端——對接 bank-adapter 服務
 * 將交易指令發往 CIPS/SWIFT/HK_RTGS 等傳統金融清算系統
 */
@Component
public class OffChainClient {

    /**
     * 將交易發往傳統金融機構清算系統
     * bank-adapter 根據 msg.getTargetRoute() 選擇 CIPS/SWIFT/HK_RTGS
     *
     * @param msg 標準報文
     */
    public void sendToFinancialInstitution(StandardMessage msg) {
        // TODO: 調用 bank-adapter /api/v1/outbound/send
        throw new UnsupportedOperationException("not implemented: call bank-adapter");
    }
}
