package com.chainfusion.bankadapter.protocol;

import com.chainfusion.bankadapter.model.HKRTGSMessage;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.ByteArrayInputStream;
import java.math.BigDecimal;

/**
 * 香港 RTGS 報文解析器（ISO 20022 XML 格式）
 * HKD CHATS（港元清算）和 USD CHATS（美元清算）均使用此解析器
 *
 * 報文標準：HKMA 採用 ISO 20022 pacs.009（金融機構直接借記轉賬）
 */
public class HKRTGSParser {

    /**
     * 解析 HK RTGS XML 報文 → HKRTGSMessage
     */
    public static HKRTGSMessage parse(String xmlContent) {
        HKRTGSMessage msg = new HKRTGSMessage();
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
            factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);

            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xmlContent.getBytes("UTF-8")));
            doc.getDocumentElement().normalize();

            msg.setTxId(getTextContent(doc, "MsgId"));
            msg.setFromBank(getTextContent(doc, "DbtrAgt"));
            msg.setFromAccount(getTextContent(doc, "DbtrAcct"));
            msg.setToBank(getTextContent(doc, "CdtrAgt"));
            msg.setToAccount(getTextContent(doc, "CdtrAcct"));
            msg.setCurrency(getAttr(doc, "IntrBkSttlmAmt", "Ccy"));
            msg.setSettlementDate(getTextContent(doc, "IntrBkSttlmDt"));
            msg.setPurposeCode(getTextContent(doc, "Purp"));
            msg.setHkmaSequenceNo(getTextContent(doc, "SeqNb"));

            String amtStr = getTextContent(doc, "IntrBkSttlmAmt");
            if (amtStr != null && !amtStr.isBlank()) {
                msg.setSettlementAmount(new BigDecimal(amtStr));
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse HK_RTGS XML: " + e.getMessage(), e);
        }
        return msg;
    }

    private static String getTextContent(Document doc, String tagName) {
        NodeList nodes = doc.getElementsByTagName(tagName);
        return nodes.getLength() > 0 ? nodes.item(0).getTextContent() : null;
    }

    private static String getAttr(Document doc, String tagName, String attrName) {
        NodeList nodes = doc.getElementsByTagName(tagName);
        if (nodes.getLength() > 0) {
            return ((Element) nodes.item(0)).getAttribute(attrName);
        }
        return null;
    }
}
