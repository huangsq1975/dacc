package api

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/health"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/router"
)

// Server route-engine HTTP API 服務
// 僅供 APISIX 插件內部調用，不對外暴露
type Server struct {
	httpSrv *http.Server
	engine  *router.Engine
	monitor *health.Monitor
}

func NewServer(addr string, engine *router.Engine, monitor *health.Monitor) *Server {
	s := &Server{engine: engine, monitor: monitor}
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/route/decide", s.handleDecide)
	mux.HandleFunc("/api/v1/chain/health", s.handleHealth)
	mux.HandleFunc("/healthz", s.handleHealthz)
	s.httpSrv = &http.Server{Addr: addr, Handler: mux}
	return s
}

func (s *Server) Start() error { return s.httpSrv.ListenAndServe() }

func (s *Server) Stop(ctx context.Context) { s.httpSrv.Shutdown(ctx) }

// POST /api/v1/route/decide — 供 chain-health-route.lua 調用
func (s *Server) handleDecide(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req router.RouteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	decision, err := s.engine.Decide(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(decision)
}

// GET /api/v1/chain/health — 返回所有節點健康狀態
func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	scores := s.monitor.GetAllScores()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"nodes": scores,
		"total": len(scores),
	})
}

// GET /healthz — 自身健康檢查（供 APISIX upstream health check 使用）
func (s *Server) handleHealthz(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}
