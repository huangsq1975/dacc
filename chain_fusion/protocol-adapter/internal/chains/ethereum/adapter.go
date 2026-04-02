package ethereum

// Adapter Ethereum / BSC 鏈協議適配器
// 可複用 walletos 的 eth_rs 模塊（Rust）或直接對接 go-ethereum
// 狀態：部分可複用（walletos 已有 ETH 支持）
type Adapter struct {
	nodeURL string
	chainID int64 // 1=ETH Mainnet, 56=BSC
}

func New(nodeURL string, chainID int64) *Adapter {
	return &Adapter{nodeURL: nodeURL, chainID: chainID}
}

// GetBalance 查詢地址餘額
func (a *Adapter) GetBalance(address string) (string, error) {
	// TODO: 對接 walletos JSON-RPC 或直接使用 go-ethereum
	panic("not implemented")
}

// SendTransaction 發送已簽名交易
func (a *Adapter) SendTransaction(rawTx string) (string, error) {
	// TODO: eth_sendRawTransaction
	panic("not implemented")
}

// GetTransactionReceipt 查詢交易收據
func (a *Adapter) GetTransactionReceipt(txHash string) (interface{}, error) {
	// TODO: eth_getTransactionReceipt
	panic("not implemented")
}

// EstimateGas 預估 Gas
func (a *Adapter) EstimateGas(from, to, data string) (uint64, error) {
	// TODO: eth_estimateGas
	panic("not implemented")
}
