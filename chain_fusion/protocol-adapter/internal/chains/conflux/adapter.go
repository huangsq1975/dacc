package conflux

// Adapter Conflux 鏈協議適配器
// Conflux 使用 JSON-RPC 協議（與 ETH 相似但有差異）
// TODO: 全新開發 - 現有 walletos 不支持 Conflux
type Adapter struct {
	nodeURL string
}

func New(nodeURL string) *Adapter {
	return &Adapter{nodeURL: nodeURL}
}

// GetBalance 查詢地址餘額
func (a *Adapter) GetBalance(address string) (string, error) {
	// TODO: 調用 Conflux cfx_getBalance JSON-RPC
	panic("not implemented")
}

// SendTransaction 發送交易
func (a *Adapter) SendTransaction(rawTx string) (string, error) {
	// TODO: 調用 Conflux cfx_sendRawTransaction JSON-RPC
	panic("not implemented")
}

// GetTransactionStatus 查詢交易狀態
func (a *Adapter) GetTransactionStatus(txHash string) (string, error) {
	// TODO: 調用 Conflux cfx_getTransactionReceipt JSON-RPC
	panic("not implemented")
}
