package health

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
)

// RedisConfig Redis 連接配置
type RedisConfig struct {
	Addr     string
	Password string
}

// ChainConfig 鏈節點配置
type ChainConfig struct {
	ChainID   string
	NodeURLs  []string
	// HIGH = CIPS 聯盟鏈，探測頻率 1 秒；NORMAL = 普通公鏈，探測頻率 10 秒
	Priority  string
	BridgeURL string
}

// NodeScore 節點健康評分
type NodeScore struct {
	ChainID           string    `json:"chain_id"`
	NodeURL           string    `json:"node_url"`
	Connectivity      float64   `json:"connectivity"`       // 連通率 0-1
	ConfirmLatencyMs  int64     `json:"confirm_latency_ms"` // 確認延遲
	GasPriceGwei      float64   `json:"gas_price_gwei"`
	BridgeSuccessRate float64   `json:"bridge_success_rate"` // 跨鏈橋成功率 0-1
	ComplianceOK      bool      `json:"compliance_ok"`
	HealthScore       float64   `json:"health_score"` // 0-100
	UpdatedAt         time.Time `json:"updated_at"`
}

// CalcHealthScore 健康度 = (連通率×40% + 延遲達標率×30% + 橋成功率×20% + 合規狀態×10%) × 100
func CalcHealthScore(s *NodeScore) float64 {
	complianceScore := 0.0
	if s.ComplianceOK {
		complianceScore = 1.0
	}
	latencyScore := 0.0
	if s.ConfirmLatencyMs <= 3500 {
		latencyScore = 1.0
	} else if s.ConfirmLatencyMs <= 7000 {
		latencyScore = 0.5
	}
	return (s.Connectivity*0.4 + latencyScore*0.3 + s.BridgeSuccessRate*0.2 + complianceScore*0.1) * 100
}

// Monitor 多鏈節點健康監控
// 探測結果寫入 Redis，APISIX 插件和 route-engine API 均可讀取
type Monitor struct {
	chains    []ChainConfig
	scores    map[string]*NodeScore
	bridgeEMA map[string]float64 // chainID → 跨鏈橋成功率指數移動平均（EMA α=0.3）
	mu        sync.RWMutex
	rdb       *redis.Client
	ctx       context.Context
	cancel    context.CancelFunc
}

const bridgeEMAAlpha = 0.3 // EMA 平滑係數

const redisKeyPrefix = "cf:health:"

func NewMonitor(chains []ChainConfig, redisCfg RedisConfig) *Monitor {
	ctx, cancel := context.WithCancel(context.Background())
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisCfg.Addr,
		Password: redisCfg.Password,
	})
	return &Monitor{
		chains:    chains,
		scores:    make(map[string]*NodeScore),
		bridgeEMA: make(map[string]float64),
		rdb:       rdb,
		ctx:       ctx,
		cancel:    cancel,
	}
}

func (m *Monitor) Start() {
	for _, chain := range m.chains {
		go m.probeLoop(chain)
	}
}

func (m *Monitor) Stop() {
	m.cancel()
}

func (m *Monitor) GetScore(chainID string) (*NodeScore, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	s, ok := m.scores[chainID]
	return s, ok
}

func (m *Monitor) GetAllScores() []*NodeScore {
	m.mu.RLock()
	defer m.mu.RUnlock()
	out := make([]*NodeScore, 0, len(m.scores))
	for _, s := range m.scores {
		out = append(out, s)
	}
	return out
}

func (m *Monitor) probeLoop(chain ChainConfig) {
	interval := 10 * time.Second
	if chain.Priority == "HIGH" {
		interval = 1 * time.Second
	}
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for {
		select {
		case <-m.ctx.Done():
			return
		case <-ticker.C:
			score := m.probe(chain)

			// 更新跨鏈橋成功率 EMA：bridgeOK=1 表示本次探測成功
			m.mu.Lock()
			prev, exists := m.bridgeEMA[chain.ChainID]
			if !exists {
				prev = score.BridgeSuccessRate // 首次用探測結果初始化
			}
			m.bridgeEMA[chain.ChainID] = bridgeEMAAlpha*score.BridgeSuccessRate + (1-bridgeEMAAlpha)*prev
			score.BridgeSuccessRate = m.bridgeEMA[chain.ChainID]
			score.HealthScore = CalcHealthScore(score)
			m.scores[chain.ChainID] = score
			m.mu.Unlock()

			// 寫入 Redis（TTL = 探測間隔 × 3，過期則視為不可用）
			m.writeRedis(chain.ChainID, score, interval*3)
		}
	}
}

func (m *Monitor) probe(chain ChainConfig) *NodeScore {
	nodeURL := chain.NodeURLs[0]
	score := &NodeScore{
		ChainID:      chain.ChainID,
		NodeURL:      nodeURL,
		UpdatedAt:    time.Now(),
		ComplianceOK: true,
	}

	// 連通性探測：eth_blockNumber（同時驗證節點是否真實在線）
	start := time.Now()
	latency, connected := probeNodeRPC(nodeURL)
	score.ConfirmLatencyMs = latency
	if connected {
		score.Connectivity = 1.0
	} else {
		score.Connectivity = 0
		score.ConfirmLatencyMs = 99999
	}
	_ = start

	// Gas 價格查詢（僅 EVM 兼容鏈；非 EVM 鏈跳過）
	if connected {
		if gwei, err := probeGasPrice(nodeURL); err == nil {
			score.GasPriceGwei = gwei
		}
	}

	// 跨鏈橋可用性探測
	if chain.BridgeURL != "" {
		if probeBridge(chain.BridgeURL) {
			score.BridgeSuccessRate = 1.0
		} else {
			score.BridgeSuccessRate = 0.0
		}
	} else {
		score.BridgeSuccessRate = 1.0 // 未配置跨鏈橋則視為不適用，不懲罰評分
	}

	return score
}

// probeNodeRPC 發送 eth_blockNumber 探測節點連通性，返回延遲(ms)和是否成功
func probeNodeRPC(nodeURL string) (latencyMs int64, ok bool) {
	payload := `{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}`
	client := &http.Client{Timeout: 3 * time.Second}
	start := time.Now()
	resp, err := client.Post(nodeURL, "application/json", strings.NewReader(payload))
	if err != nil {
		return 99999, false
	}
	defer resp.Body.Close()
	latencyMs = time.Since(start).Milliseconds()

	var result struct {
		Result string `json:"result"`
		Error  *struct {
			Code    int    `json:"code"`
			Message string `json:"message"`
		} `json:"error"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return latencyMs, false
	}
	if result.Error != nil || result.Result == "" {
		return latencyMs, false
	}
	return latencyMs, true
}

// probeGasPrice 查詢 EVM 兼容節點的 Gas 價格，返回 Gwei
func probeGasPrice(nodeURL string) (float64, error) {
	payload := `{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":2}`
	client := &http.Client{Timeout: 3 * time.Second}
	resp, err := client.Post(nodeURL, "application/json", strings.NewReader(payload))
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	var result struct {
		Result string `json:"result"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return 0, err
	}

	hexStr := strings.TrimPrefix(result.Result, "0x")
	wei, err := strconv.ParseUint(hexStr, 16, 64)
	if err != nil {
		return 0, fmt.Errorf("parse gasPrice hex %q: %w", result.Result, err)
	}
	return float64(wei) / 1e9, nil // Wei → Gwei
}

// probeBridge HTTP GET 跨鏈橋健康端點，狀態碼 < 500 視為可用
func probeBridge(bridgeURL string) bool {
	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(bridgeURL)
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	return resp.StatusCode < 500
}

func (m *Monitor) writeRedis(chainID string, score *NodeScore, ttl time.Duration) {
	data, err := json.Marshal(score)
	if err != nil {
		return
	}
	key := fmt.Sprintf("%s%s", redisKeyPrefix, chainID)
	m.rdb.Set(m.ctx, key, data, ttl)
}
