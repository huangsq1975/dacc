package com.chainfusion.bankadapter.protocol;

import com.chainfusion.bankadapter.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

/**
 * 報文協議轉換器（code.md 二）
 * 將各渠道原始報文統一轉換為 StandardMessage，並支持反向轉換
 *
 * 支持渠道：
 *   CIPS    — 人民幣跨境支付系統（ISO 20022 pacs.008）
 *   SWIFT   — SWIFT MT103/MT202（FIN 格式）
 *   MBRIDGE — 多邊央行數字貨幣橋
 *   HK_RTGS — 香港 RTGS（HKD CHATS / USD CHATS）
 */
@Slf4j
@Service
public class ProtocolConverter {

    /**
     * 統一轉換入口
     * 對應 code.md：ProtocolConverter.convert(rawMsg, channel)
     */
    public StandardMessage convert(String rawContent, String channel) {
        log.info("[CONVERTER] converting channel={}", channel);
        return switch (channel.toUpperCase()) {
            case "CIPS"     -> convertFromCIPS(CIPSParser.parse(rawContent));
            case "SWIFT"    -> convertFromSWIFT(SWIFTParser.parse(rawContent));
            case "MBRIDGE"  -> convertFromMBridge(MBridgeParser.parse(rawContent));
            case "HK_RTGS"  -> convertFromHKRTGS(HKRTGSParser.parse(rawContent));
            default -> throw new UnsupportedOperationException("Unsupported channel: " + channel);
        };
    }

    // ── 正向轉換 ──────────────────────────────────────────────────

    /**
     * CIPS 報文 → 網關標準報文
     * 對應 code.md：convertFromCIPS()
     */
    private StandardMessage convertFromCIPS(CIPSMessage cipsMsg) {
        StandardMessage msg = new StandardMessage();
        msg.setMsgId(cipsMsg.getInstructionId());
        msg.setPayer(cipsMsg.getDebtorAccount());
        msg.setPayee(cipsMsg.getCreditorAccount());
        msg.setAmount(cipsMsg.getAmount());
        msg.setCurrency(cipsMsg.getCurrency());
        msg.setChannel("CIPS");
        msg.setOnChain(false);
        msg.setRawData(cipsMsg.getXmlContent());
        msg.setSignature(cipsMsg.getSignature());
        msg.setTimestamp(Instant.now());
        msg.getExtension().put("debtorBic",    cipsMsg.getDebtorBic());
        msg.getExtension().put("creditorBic",  cipsMsg.getCreditorBic());
        msg.getExtension().put("remittanceInfo", cipsMsg.getRemittanceInfo());
        msg.getExtension().put("settlementDate", cipsMsg.getSettlementDate());
        log.debug("[CONVERTER] CIPS msgId={} payer={} payee={} amount={} {}",
            msg.getMsgId(), msg.getPayer(), msg.getPayee(), msg.getAmount(), msg.getCurrency());
        return msg;
    }

    /**
     * SWIFT MT 報文 → 標準報文
     * 對應 code.md：convertFromSWIFT()
     */
    private StandardMessage convertFromSWIFT(SWIFTMessage swiftMsg) {
        StandardMessage msg = new StandardMessage();
        msg.setMsgId(swiftMsg.getField20());           // Field 20：交易參考編號
        msg.setPayer(swiftMsg.getField50K());           // Field 50K：付款方
        msg.setPayee(swiftMsg.getField59());            // Field 59：收款方
        msg.setAmount(swiftMsg.getField32B());          // Field 32A：金額
        msg.setCurrency(swiftMsg.getCurrency());
        msg.setChannel("SWIFT");
        msg.setOnChain(false);
        msg.setRawData(swiftMsg.getRawMt());
        msg.setTimestamp(Instant.now());
        msg.getExtension().put("msgType",      swiftMsg.getMsgType());
        msg.getExtension().put("field52A",     swiftMsg.getField52A());
        msg.getExtension().put("field57A",     swiftMsg.getField57A());
        msg.getExtension().put("remittanceInfo", swiftMsg.getField70());
        msg.getExtension().put("chargeBearer", swiftMsg.getField71A());
        msg.getExtension().put("valueDate",    swiftMsg.getValueDate());
        log.debug("[CONVERTER] SWIFT msgId={} payer={} payee={} amount={} {}",
            msg.getMsgId(), msg.getPayer(), msg.getPayee(), msg.getAmount(), msg.getCurrency());
        return msg;
    }

    /**
     * mBridge 多邊央行數字貨幣橋 → 標準報文
     * 對應 code.md：convertFromMBridge()
     */
    private StandardMessage convertFromMBridge(MBridgeMessage mMsg) {
        StandardMessage msg = new StandardMessage();
        msg.setMsgId(mMsg.getTxHash());
        msg.setPayer(mMsg.getPayerWallet());
        msg.setPayee(mMsg.getPayeeWallet());
        msg.setAmount(mMsg.getCbdcAmount());
        msg.setCurrency(mMsg.getCurrency());     // eCNY/CBDC/DIGITAL_HKD
        msg.setChannel("mBridge");
        msg.setOnChain(true);                    // mBridge 為鏈上交易
        msg.setCbdc(true);
        msg.setTimestamp(Instant.now());
        msg.getExtension().put("sourceChain",  mMsg.getSourceChain());
        msg.getExtension().put("targetChain",  mMsg.getTargetChain());
        msg.getExtension().put("contractAddress", mMsg.getContractAddress());
        log.debug("[CONVERTER] mBridge txHash={} payer={} payee={} amount={} {}",
            msg.getMsgId(), msg.getPayer(), msg.getPayee(), msg.getAmount(), msg.getCurrency());
        return msg;
    }

    /**
     * 香港 RTGS → 標準報文
     * 對應 code.md：convertFromHKRTGS()
     */
    private StandardMessage convertFromHKRTGS(HKRTGSMessage hkMsg) {
        StandardMessage msg = new StandardMessage();
        msg.setMsgId(hkMsg.getTxId());
        msg.setPayer(hkMsg.getFromBank() + ":" + hkMsg.getFromAccount());
        msg.setPayee(hkMsg.getToBank()   + ":" + hkMsg.getToAccount());
        msg.setAmount(hkMsg.getSettlementAmount());
        msg.setCurrency(hkMsg.getCurrency());    // HKD/USD
        msg.setChannel("HK_RTGS");
        msg.setOnChain(false);
        msg.setTimestamp(Instant.now());
        msg.getExtension().put("purposeCode",    hkMsg.getPurposeCode());
        msg.getExtension().put("hkmaSeqNo",      hkMsg.getHkmaSequenceNo());
        msg.getExtension().put("settlementDate", hkMsg.getSettlementDate());
        log.debug("[CONVERTER] HK_RTGS txId={} payer={} payee={} amount={} {}",
            msg.getMsgId(), msg.getPayer(), msg.getPayee(), msg.getAmount(), msg.getCurrency());
        return msg;
    }

    // ── 反向轉換 ──────────────────────────────────────────────────

    /**
     * 標準報文 → CIPS 報文（用於向 CIPS 系統發送指令）
     * 對應 code.md：convertToCIPS()
     */
    public CIPSMessage convertToCIPS(StandardMessage msg) {
        CIPSMessage cips = new CIPSMessage();
        cips.setInstructionId(msg.getMsgId());
        cips.setDebtorAccount(msg.getPayer());
        cips.setCreditorAccount(msg.getPayee());
        cips.setAmount(msg.getAmount());
        cips.setCurrency(msg.getCurrency());
        cips.setDebtorBic(msg.getExtension().get("debtorBic"));
        cips.setCreditorBic(msg.getExtension().get("creditorBic"));
        cips.setRemittanceInfo(msg.getExtension().get("remittanceInfo"));
        cips.setSettlementDate(msg.getExtension().get("settlementDate"));
        // TODO: 生成 ISO 20022 pacs.008 XML 報文（調用 ISO20022Builder）
        return cips;
    }

    /**
     * 標準報文 → SWIFT MT103 報文
     * 對應 code.md：convertToSWIFT()
     */
    public SWIFTMessage convertToSWIFT(StandardMessage msg) {
        SWIFTMessage swift = new SWIFTMessage();
        swift.setField20(msg.getMsgId());
        swift.setField50K(msg.getPayer());
        swift.setField59(msg.getPayee());
        swift.setField32B(msg.getAmount());
        swift.setCurrency(msg.getCurrency());
        swift.setField52A(msg.getExtension().get("field52A"));
        swift.setField57A(msg.getExtension().get("field57A"));
        swift.setField70(msg.getExtension().get("remittanceInfo"));
        swift.setField71A(msg.getExtension().getOrDefault("chargeBearer", "SHA"));
        swift.setMsgType("MT103");
        // TODO: 生成 MT103 FIN 格式報文字符串
        return swift;
    }

    /**
     * 標準報文 → mBridge 報文
     * 對應 code.md：convertToMBridge()
     */
    public MBridgeMessage convertToMBridge(StandardMessage msg) {
        MBridgeMessage mbridge = new MBridgeMessage();
        mbridge.setPayerWallet(msg.getPayer());
        mbridge.setPayeeWallet(msg.getPayee());
        mbridge.setCbdcAmount(msg.getAmount());
        mbridge.setCurrency(msg.getCurrency());
        mbridge.setSourceChain(msg.getExtension().get("sourceChain"));
        mbridge.setTargetChain(msg.getExtension().get("targetChain"));
        mbridge.setContractAddress(msg.getExtension().get("contractAddress"));
        return mbridge;
    }
}
