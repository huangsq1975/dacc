package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/api"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/health"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/router"
)

func main() {
	cfg := loadConfig()

	// 節點健康監控（主動探測，結果存入 Redis 供 APISIX 插件讀取）
	monitor := health.NewMonitor(cfg.Chains, cfg.Redis)
	monitor.Start()
	defer monitor.Stop()

	// 路由決策引擎
	engine := router.NewEngine(monitor, cfg.Routing)

	// HTTP API 服務（僅供 APISIX 插件內部調用，不對外暴露）
	srv := api.NewServer(cfg.ListenAddr, engine, monitor)
	go func() {
		log.Printf("route-engine listening on %s", cfg.ListenAddr)
		if err := srv.Start(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("route-engine server error: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	srv.Stop(ctx)
}

// Config route-engine 配置（最終從環境變量或 Apollo 加載）
type Config struct {
	ListenAddr string
	Redis      health.RedisConfig
	Chains     []health.ChainConfig
	Routing    router.Config
}

func loadConfig() Config {
	return Config{
		ListenAddr: envOr("ROUTE_ENGINE_ADDR", ":8090"),
		Redis: health.RedisConfig{
			Addr:     envOr("REDIS_ADDR", "redis:6379"),
			Password: envOr("REDIS_PASSWORD", ""),
		},
		Routing: router.Config{
			DefaultStrategy: envOr("ROUTING_STRATEGY", "compliance_first"),
			CoreTxTypes:     []string{"SETTLEMENT", "CIPS_PAYMENT"},
		},
	}
}

func envOr(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
