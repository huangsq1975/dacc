package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/api"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/apisix"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/failover"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/health"
	"github.com/dacc/chain_fusion/gateway-core/route-engine/internal/router"
)

func main() {
	cfg := loadConfig()

	// 節點健康監控（主動探測，結果存入 Redis 供 APISIX 插件讀取）
	monitor := health.NewMonitor(cfg.Chains, cfg.Redis)
	monitor.Start()
	defer monitor.Stop()

	// 容災切換監控（APISIX Admin API 聯動）
	var apisixClient *apisix.Client
	if cfg.Apisix.AdminURL != "" {
		apisixClient = apisix.NewClient(cfg.Apisix)
		log.Printf("APISIX Admin API integration enabled: %s", cfg.Apisix.AdminURL)
	} else {
		log.Printf("APISIX Admin API integration disabled (APISIX_ADMIN_URL not set)")
	}
	watcher := failover.NewWatcher(monitor, apisixClient)
	go watcher.Start()

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
	Apisix     apisix.Config
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
		Apisix: apisix.Config{
			AdminURL:    envOr("APISIX_ADMIN_URL", ""),
			APIKey:      envOr("APISIX_API_KEY", ""),
			UpstreamMap: parseUpstreamMap(envOr("APISIX_UPSTREAM_MAP", "")),
		},
	}
}

// parseUpstreamMap 解析 "chainID1=upstreamID1,chainID2=upstreamID2" 格式的環境變量
// e.g. "ethereum=protocol-adapter,bsc=protocol-adapter"
func parseUpstreamMap(raw string) map[string]string {
	m := make(map[string]string)
	for _, pair := range strings.Split(raw, ",") {
		pair = strings.TrimSpace(pair)
		if pair == "" {
			continue
		}
		parts := strings.SplitN(pair, "=", 2)
		if len(parts) == 2 {
			m[strings.TrimSpace(parts[0])] = strings.TrimSpace(parts[1])
		}
	}
	return m
}

func envOr(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
