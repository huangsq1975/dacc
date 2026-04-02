package com.chainfusion.bankadapter.protocol;

import com.chainfusion.bankadapter.model.CIPSMessage;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.ByteArrayInputStream;
import java.math.BigDecimal;

/**
 * CIPS ISO 20022 XML 報文解析器（pacs.008 格式）
 */
public class CIPSParser {

    /**
     * 解析 CIPS pacs.008 XML → CIPSMessage
     *
     * pacs.008 關鍵字段：
     *   GrpHdr/MsgId       → instructionId
     *   CdtTrfTxInf/IntrBkSttlmAmt → amount + currency
     *   CdtTrfTxInf/Dbtr/Acct/Id   → debtorAccount
     *   CdtTrfTxInf/Cdtr/Acct/Id   → creditorAccount
     */
    public static CIPSMessage parse(String xmlContent) {
        CIPSMessage msg = new CIPSMessage();
        msg.setXmlContent(xmlContent);

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            // 防止 XXE 攻擊
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
            factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);

            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xmlContent.getBytes("UTF-8")));
            doc.getDocumentElement().normalize();

            msg.setInstructionId(getTextContent(doc, "MsgId"));
            msg.setDebtorAccount(getTextContent(doc, "DbtrAcct"));
            msg.setCreditorAccount(getTextContent(doc, "CdtrAcct"));
            msg.setCurrency(getAttr(doc, "IntrBkSttlmAmt", "Ccy"));
            String amtStr = getTextContent(doc, "IntrBkSttlmAmt");
            if (amtStr != null && !amtStr.isBlank()) {
                msg.setAmount(new BigDecimal(amtStr));
            }
            msg.setDebtorBic(getTextContent(doc, "DbtrAgt"));
            msg.setCreditorBic(getTextContent(doc, "CdtrAgt"));
            msg.setRemittanceInfo(getTextContent(doc, "RmtInf"));
            msg.setSettlementDate(getTextContent(doc, "IntrBkSttlmDt"));

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CIPS pacs.008 XML: " + e.getMessage(), e);
        }

        return msg;
    }

    private static String getTextContent(Document doc, String tagName) {
        NodeList nodes = doc.getElementsByTagName(tagName);
        if (nodes.getLength() > 0) {
            return nodes.item(0).getTextContent();
        }
        return null;
    }

    private static String getAttr(Document doc, String tagName, String attrName) {
        NodeList nodes = doc.getElementsByTagName(tagName);
        if (nodes.getLength() > 0) {
            return ((Element) nodes.item(0)).getAttribute(attrName);
        }
        return null;
    }
}
