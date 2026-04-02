package plugin

import "fmt"

// ChainAdapter 所有鏈適配器必須實現的統一接口（SPI）
type ChainAdapter interface {
	ChainID() string
	GetBalance(address string) (string, error)
	SendTransaction(rawTx string) (txHash string, err error)
	GetTransactionStatus(txHash string) (status string, err error)
	EstimateGas(from, to, data string) (uint64, error)
	HealthCheck() (bool, error)
}

// Registry 插件注冊表（支持熱插拔，新增鏈適配周期 ≤ 1-2 週）
type Registry struct {
	adapters map[string]ChainAdapter
}

func NewRegistry() *Registry {
	return &Registry{adapters: make(map[string]ChainAdapter)}
}

// Register 注冊鏈適配器
func (r *Registry) Register(adapter ChainAdapter) {
	r.adapters[adapter.ChainID()] = adapter
}

// Unregister 卸載鏈適配器（不影響其他鏈運行）
func (r *Registry) Unregister(chainID string) {
	delete(r.adapters, chainID)
}

// Get 獲取指定鏈的適配器
func (r *Registry) Get(chainID string) (ChainAdapter, error) {
	adapter, ok := r.adapters[chainID]
	if !ok {
		return nil, fmt.Errorf("no adapter registered for chain: %s", chainID)
	}
	return adapter, nil
}

// List 列出所有已注冊的鏈
func (r *Registry) List() []string {
	chains := make([]string, 0, len(r.adapters))
	for k := range r.adapters {
		chains = append(chains, k)
	}
	return chains
}
