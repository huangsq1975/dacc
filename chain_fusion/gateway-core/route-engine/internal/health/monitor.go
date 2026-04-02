package health

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
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
	chains  []ChainConfig
	scores  map[string]*NodeScore
	mu      sync.RWMutex
	rdb     *redis.Client
	ctx     context.Context
	cancel  context.CancelFunc
}

const redisKeyPrefix = "cf:health:"

func NewMonitor(chains []ChainConfig, redisCfg RedisConfig) *Monitor {
	ctx, cancel := context.WithCancel(context.Background())
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisCfg.Addr,
		Password: redisCfg.Password,
	})
	return &Monitor{
		chains: chains,
		scores: make(map[string]*NodeScore),
		rdb:    rdb,
		ctx:    ctx,
		cancel: cancel,
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
			score.HealthScore = CalcHealthScore(score)

			m.mu.Lock()
			m.scores[chain.ChainID] = score
			m.mu.Unlock()

			// 寫入 Redis（TTL = 探測間隔 × 3，過期則視為不可用）
			m.writeRedis(chain.ChainID, score, interval*3)
		}
	}
}

func (m *Monitor) probe(chain ChainConfig) *NodeScore {
	score := &NodeScore{
		ChainID:      chain.ChainID,
		NodeURL:      chain.NodeURLs[0],
		UpdatedAt:    time.Now(),
		ComplianceOK: true,
	}

	// 連通性探測（HTTP ping）
	start := time.Now()
	client := &http.Client{Timeout: 3 * time.Second}
	resp, err := client.Get(chain.NodeURLs[0])
	if err == nil {
		resp.Body.Close()
		score.Connectivity = 1.0
		score.ConfirmLatencyMs = time.Since(start).Milliseconds()
	} else {
		score.Connectivity = 0
		score.ConfirmLatencyMs = 99999
	}

	// TODO: 實現真實的 Gas 價格查詢
	// TODO: 實現跨鏈橋可用性探測
	score.BridgeSuccessRate = 1.0 // 暫時默認可用

	return score
}

func (m *Monitor) writeRedis(chainID string, score *NodeScore, ttl time.Duration) {
	data, err := json.Marshal(score)
	if err != nil {
		return
	}
	key := fmt.Sprintf("%s%s", redisKeyPrefix, chainID)
	m.rdb.Set(m.ctx, key, data, ttl)
}
