package failover

import (
	"log"
	"time"

	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/health"
)

// Watcher 容災切換監控
// 當主節點健康評分連續低於閾值時，標記為不可用並觸發告警
// 恢復時間目標：≤ 5 分鐘（通過 APISIX 動態路由自動切換，幾乎實時）
type Watcher struct {
	monitor       *health.Monitor
	scoreThreshold float64 // 低於此分值視為不可用（默認 40）
	checkInterval  time.Duration
	// chainID → 連續低分次數
	failCounts    map[string]int
	failThreshold int // 連續 N 次低分才觸發切換（防抖）
}

func NewWatcher(monitor *health.Monitor) *Watcher {
	return &Watcher{
		monitor:        monitor,
		scoreThreshold: 40.0,
		checkInterval:  5 * time.Second,
		failCounts:     make(map[string]int),
		failThreshold:  3,
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
				// TODO: 調用 APISIX Admin API 將此節點從 upstream 摘除
				// TODO: 發送告警（郵件/企業微信）
				w.notifyAlarm(score)
			}
		} else {
			if w.failCounts[score.ChainID] >= w.failThreshold {
				log.Printf("[FAILOVER] chain=%s recovered, score=%.1f", score.ChainID, score.HealthScore)
				// TODO: 調用 APISIX Admin API 恢復節點
			}
			w.failCounts[score.ChainID] = 0
		}
	}
}

func (w *Watcher) notifyAlarm(score *health.NodeScore) {
	// TODO: 對接 AlertManager，發送多渠道告警（郵件/短信/企業微信）
	log.Printf("[ALARM] chain=%s node=%s health=%.1f bridge_rate=%.2f",
		score.ChainID, score.NodeURL, score.HealthScore, score.BridgeSuccessRate)
}
