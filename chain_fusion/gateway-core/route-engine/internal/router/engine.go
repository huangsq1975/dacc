package router

import (
	"fmt"
	"sort"

	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/health"
)

// Config 路由引擎配置
type Config struct {
	// 默認路由策略：compliance_first / efficiency_first / cost_first / health_first
	DefaultStrategy string
	// 使用效率優先策略的交易類型（如清算核心交易）
	CoreTxTypes []string
}

// RouteRequest 路由請求（來自 APISIX chain-health-route 插件）
type RouteRequest struct {
	RequestID   string
	SourceChain string
	TargetChain string
	TxType      string
	Amount      float64
	Currency    string
	Strategy    string // 可由 APISIX 插件配置覆蓋
}

// RouteDecision 路由決策結果
type RouteDecision struct {
	SelectedNode string  `json:"selected_node"`
	Bridge       string  `json:"bridge"`
	HealthScore  float64 `json:"health_score"`
	RouteReason  string  `json:"route_reason"`
}

// Engine 智能路由引擎
type Engine struct {
	monitor *health.Monitor
	config  Config
}

func NewEngine(monitor *health.Monitor, config Config) *Engine {
	return &Engine{monitor: monitor, config: config}
}

// Decide 路由決策
// 策略優先級：compliance_first → efficiency_first（核心交易）/ cost_first（非核心）→ health_first
func (e *Engine) Decide(req RouteRequest) (*RouteDecision, error) {
	all := e.monitor.GetAllScores()
	if len(all) == 0 {
		return nil, fmt.Errorf("no chain nodes available")
	}

	// 篩選目標鏈的合規節點
	strategy := e.resolveStrategy(req)
	candidates := e.filterCompliant(all, req.TargetChain)
	if len(candidates) == 0 {
		return nil, fmt.Errorf("no compliant nodes for chain=%s", req.TargetChain)
	}

	selected := e.rank(candidates, strategy)
	return &RouteDecision{
		SelectedNode: selected.NodeURL,
		HealthScore:  selected.HealthScore,
		RouteReason:  fmt.Sprintf("strategy=%s health=%.1f latency=%dms", strategy, selected.HealthScore, selected.ConfirmLatencyMs),
	}, nil
}

func (e *Engine) resolveStrategy(req RouteRequest) string {
	// 插件傳入的 strategy 優先
	if req.Strategy != "" && req.Strategy != "compliance_first" {
		return req.Strategy
	}
	// 核心交易類型使用效率優先
	for _, t := range e.config.CoreTxTypes {
		if t == req.TxType {
			return "efficiency_first"
		}
	}
	return e.config.DefaultStrategy
}

func (e *Engine) filterCompliant(scores []*health.NodeScore, targetChain string) []*health.NodeScore {
	var out []*health.NodeScore
	for _, s := range scores {
		if s.ChainID == targetChain && s.ComplianceOK && s.Connectivity > 0 {
			out = append(out, s)
		}
	}
	return out
}

func (e *Engine) rank(candidates []*health.NodeScore, strategy string) *health.NodeScore {
	sort.Slice(candidates, func(i, j int) bool {
		a, b := candidates[i], candidates[j]
		switch strategy {
		case "efficiency_first":
			// 延遲最低優先
			return a.ConfirmLatencyMs < b.ConfirmLatencyMs
		case "cost_first":
			// Gas 最低優先
			return a.GasPriceGwei < b.GasPriceGwei
		default:
			// compliance_first / health_first：健康評分最高優先
			return a.HealthScore > b.HealthScore
		}
	})
	return candidates[0]
}
