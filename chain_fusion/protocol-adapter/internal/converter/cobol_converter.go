package converter

// COBOLConverter COBOL ↔ JSON 數據格式雙向轉換
// TODO: 全新開發 - 現有 monorepo 中無任何 COBOL 處理邏輯
// 支持 EBCDIC/UTF-8 編碼互轉，以及 COBOL copybook 結構解析
type COBOLConverter struct {
	// copybookPath COBOL copybook 文件路徑（定義欄位結構）
	copybookPath string
}

func NewCOBOLConverter(copybookPath string) *COBOLConverter {
	return &COBOLConverter{copybookPath: copybookPath}
}

// COBOLToJSON 將 COBOL 結構化數據（EBCDIC 編碼）轉換為 JSON
func (c *COBOLConverter) COBOLToJSON(cobolData []byte) ([]byte, error) {
	// TODO:
	// 1. EBCDIC → UTF-8 字符集轉換
	// 2. 按 copybook 定義解析固定寬度欄位
	// 3. 輸出 JSON 格式
	panic("not implemented")
}

// JSONToCOBOL 將 JSON 數據轉換為 COBOL 結構化數據（EBCDIC 編碼）
func (c *COBOLConverter) JSONToCOBOL(jsonData []byte) ([]byte, error) {
	// TODO:
	// 1. 解析 JSON
	// 2. 按 copybook 定義填充固定寬度欄位
	// 3. UTF-8 → EBCDIC 字符集轉換
	panic("not implemented")
}

// ISO20022ToGatewayMessage 將 ISO 20022 XML 報文轉換為 GatewayMessage
func ISO20022ToGatewayMessage(xmlData []byte) (map[string]interface{}, error) {
	// TODO: 解析 ISO 20022 XML（pacs.008 / camt.056 等）
	panic("not implemented")
}
