package failover

import (
	"fmt"
	"log"
	"net/url"
	"time"

	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/apisix"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/health"
)

// Watcher 容災切換監控
// 當節點健康評分連續低於閾值時，通過 APISIX Admin API 摘除節點；
// 評分恢復後自動將節點重新加回 upstream。
// 恢復時間目標：≤ 5 分鐘（通過 APISIX 動態路由自動切換，幾乎實時）
type Watcher struct {
	monitor        *health.Monitor
	scoreThreshold float64
	checkInterval  time.Duration
	// chainID → 連續低分次數
	failCounts    map[string]int
	failThreshold int // 連續 N 次低分才觸發切換（防抖）
	// chainID → 是否已從 APISIX upstream 摘除
	removedNodes map[string]bool
	// apisix 為 nil 時禁用 APISIX 聯動（僅記錄日誌）
	apisixClient *apisix.Client
}

func NewWatcher(monitor *health.Monitor, apisixClient *apisix.Client) *Watcher {
	return &Watcher{
		monitor:        monitor,
		scoreThreshold: 40.0,
		checkInterval:  5 * time.Second,
		failCounts:     make(map[string]int),
		failThreshold:  3,
		removedNodes:   make(map[string]bool),
		apisixClient:   apisixClient,
	}
}

func (w *Watcher) Start() {
	ticker := time.NewTicker(w.checkInterval)
	defer ticker.Stop()
	for range ticker.C {
		w.check()
	}
}

func (w *Watcher) check() {
	for _, score := range w.monitor.GetAllScores() {
		if score.HealthScore < w.scoreThreshold {
			w.failCounts[score.ChainID]++
			if w.failCounts[score.ChainID] >= w.failThreshold {
				log.Printf("[FAILOVER] chain=%s score=%.1f consecutive_failures=%d — marking unhealthy",
					score.ChainID, score.HealthScore, w.failCounts[score.ChainID])
				// 首次達到閾值才調用 Admin API，避免重複摘除
				if !w.removedNodes[score.ChainID] {
					w.removeFromApisix(score)
				}
				w.notifyAlarm(score)
			}
		} else {
			if w.failCounts[score.ChainID] >= w.failThreshold {
				log.Printf("[FAILOVER] chain=%s recovered, score=%.1f — restoring node",
					score.ChainID, score.HealthScore)
				w.restoreToApisix(score)
			}
			w.failCounts[score.ChainID] = 0
		}
	}
}

// removeFromApisix 通過 Admin API 將故障節點從 upstream 摘除（weight=0）
func (w *Watcher) removeFromApisix(score *health.NodeScore) {
	if w.apisixClient == nil {
		return
	}
	upstreamID := w.apisixClient.UpstreamID(score.ChainID)
	if upstreamID == "" {
		log.Printf("[FAILOVER] chain=%s: no upstream mapping, skipping APISIX removal", score.ChainID)
		return
	}
	nodeAddr, err := nodeHostPort(score.NodeURL)
	if err != nil {
		log.Printf("[FAILOVER] chain=%s: parse node URL %q: %v", score.ChainID, score.NodeURL, err)
		return
	}
	if err := w.apisixClient.RemoveNode(upstreamID, nodeAddr); err != nil {
		log.Printf("[FAILOVER] chain=%s: remove node %s from upstream %s: %v",
			score.ChainID, nodeAddr, upstreamID, err)
		return
	}
	w.removedNodes[score.ChainID] = true
	log.Printf("[FAILOVER] chain=%s: node %s removed from upstream=%s (weight=0)",
		score.ChainID, nodeAddr, upstreamID)
}

// restoreToApisix 通過 Admin API 將恢復節點重新加入 upstream（weight=1）
func (w *Watcher) restoreToApisix(score *health.NodeScore) {
	if w.apisixClient == nil || !w.removedNodes[score.ChainID] {
		return
	}
	upstreamID := w.apisixClient.UpstreamID(score.ChainID)
	if upstreamID == "" {
		return
	}
	nodeAddr, err := nodeHostPort(score.NodeURL)
	if err != nil {
		log.Printf("[FAILOVER] chain=%s: parse node URL %q: %v", score.ChainID, score.NodeURL, err)
		return
	}
	if err := w.apisixClient.RestoreNode(upstreamID, nodeAddr); err != nil {
		log.Printf("[FAILOVER] chain=%s: restore node %s to upstream %s: %v",
			score.ChainID, nodeAddr, upstreamID, err)
		return
	}
	w.removedNodes[score.ChainID] = false
	log.Printf("[FAILOVER] chain=%s: node %s restored to upstream=%s (weight=1)",
		score.ChainID, nodeAddr, upstreamID)
}

func (w *Watcher) notifyAlarm(score *health.NodeScore) {
	// TODO: 對接 AlertManager，發送多渠道告警（郵件/短信/企業微信）
	log.Printf("[ALARM] chain=%s node=%s health=%.1f bridge_rate=%.2f",
		score.ChainID, score.NodeURL, score.HealthScore, score.BridgeSuccessRate)
}

// nodeHostPort 從完整 URL 中提取 host:port，用作 APISIX upstream nodes 的 key
// 例：http://eth-node-1:8545/  →  eth-node-1:8545
func nodeHostPort(rawURL string) (string, error) {
	u, err := url.Parse(rawURL)
	if err != nil {
		return "", fmt.Errorf("invalid URL: %w", err)
	}
	if u.Host == "" {
		return "", fmt.Errorf("no host in URL %q", rawURL)
	}
	return u.Host, nil
}
