package com.chainfusion.bankadapter.protocol;

import com.chainfusion.bankadapter.model.SWIFTMessage;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * SWIFT MT 報文解析器（FIN 格式）
 *
 * MT103 報文結構（塊格式）：
 *   {1:F01...}{2:I103...}{3:{119:STP}}{4:
 *   :20:TXN123456
 *   :23B:CRED
 *   :32A:260401USD1000,00
 *   :50K:/ACC123\nORDERING CUSTOMER
 *   :59:/ACC456\nBENEFICIARY
 *   :70:PAYMENT FOR INVOICE
 *   :71A:SHA
 *   -}
 */
public class SWIFTParser {

    /**
     * 解析 SWIFT MT 報文字符串 → SWIFTMessage
     */
    public static SWIFTMessage parse(String rawMt) {
        SWIFTMessage msg = new SWIFTMessage();
        msg.setRawMt(rawMt);

        // 判斷報文類型（MT103/MT202）
        String msgType = extractMsgType(rawMt);
        msg.setMsgType(msgType);

        // 解析 Block 4 各字段
        msg.setField20(extractField(rawMt, "20"));
        msg.setField23B(extractField(rawMt, "23B"));
        msg.setField52A(extractField(rawMt, "52A"));
        msg.setField56A(extractField(rawMt, "56A"));
        msg.setField57A(extractField(rawMt, "57A"));
        msg.setField50K(extractField(rawMt, "50K"));
        msg.setField59(extractField(rawMt, "59"));
        msg.setField70(extractField(rawMt, "70"));
        msg.setField71A(extractField(rawMt, "71A"));

        // 解析 Field 32A：值日日期 + 貨幣 + 金額（格式：YYMMDD + CCY + 金額）
        String field32A = extractField(rawMt, "32A");
        if (field32A != null && field32A.length() >= 9) {
            msg.setValueDate(field32A.substring(0, 6));
            msg.setCurrency(field32A.substring(6, 9));
            String amtStr = field32A.substring(9).replace(",", ".");
            try {
                msg.setField32B(new BigDecimal(amtStr));
            } catch (NumberFormatException e) {
                // 保留 null，由業務層處理
            }
        }

        return msg;
    }

    /**
     * 從 Block 2 提取報文類型（MT103/MT202 等）
     */
    private static String extractMsgType(String rawMt) {
        Pattern p = Pattern.compile("\\{2:[IO](\\d{3})");
        Matcher m = p.matcher(rawMt);
        return m.find() ? "MT" + m.group(1) : "UNKNOWN";
    }

    /**
     * 從 Block 4 提取指定字段值
     * 格式：:FIELD_TAG:VALUE\r\n
     */
    private static String extractField(String rawMt, String tag) {
        Pattern p = Pattern.compile(":" + tag + ":([^\r\n:][^\r\n]*)(?:\r?\n([^:][^\r\n]*))*");
        Matcher m = p.matcher(rawMt);
        if (m.find()) {
            StringBuilder sb = new StringBuilder(m.group(1).trim());
            for (int i = 2; i <= m.groupCount(); i++) {
                if (m.group(i) != null) sb.append("\n").append(m.group(i).trim());
            }
            return sb.toString();
        }
        return null;
    }
}
