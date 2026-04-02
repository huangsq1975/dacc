package cips

// Adapter CIPS（人民幣跨境支付系統）協議適配器
// TODO: 全新開發 - 需對接 CIPS 2.0 自定義 SDK，支持 ISO 20022 報文標準
// 注意：CIPS 接口為受限協議，需獲取 CIPS 官方 SDK 授權
type Adapter struct {
	endpoint string
	certPath string
}

func New(endpoint, certPath string) *Adapter {
	return &Adapter{endpoint: endpoint, certPath: certPath}
}

// SubmitPayment 提交跨境人民幣支付指令（ISO 20022 pacs.008 格式）
func (a *Adapter) SubmitPayment(pacs008 []byte) (string, error) {
	// TODO: 實現 CIPS 2.0 報文提交
	// 1. 格式轉換：內部 GatewayMessage → ISO 20022 pacs.008
	// 2. 加密簽名（SM2）
	// 3. 發送至 CIPS 節點
	panic("not implemented")
}

// QueryStatus 查詢支付指令狀態
func (a *Adapter) QueryStatus(instructionID string) (string, error) {
	// TODO: 實現 CIPS 狀態查詢（camt.028 報文）
	panic("not implemented")
}

// ConvertFromISO20022 將 ISO 20022 報文轉換為內部 GatewayMessage
func ConvertFromISO20022(raw []byte) (map[string]interface{}, error) {
	// TODO: 實現 ISO 20022 XML 解析與轉換
	panic("not implemented")
}

// ConvertToISO20022 將內部格式轉換為 ISO 20022 報文
func ConvertToISO20022(msg map[string]interface{}, msgType string) ([]byte, error) {
	// TODO: 實現 ISO 20022 報文生成（pacs.008 / camt.056 等）
	panic("not implemented")
}
