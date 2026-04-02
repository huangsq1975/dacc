# Chain Fusion — 分佈式多鏈融合網關

面向金磚國家銀行（NDB）等多邊金融機構的鏈上鏈下融合核心基礎設施。

## 目錄結構

```
chain_fusion/
├── README.md                        # 本文件
├── DEVELOPMENT_STATUS.md            # 開發狀態追蹤（哪些已完成、哪些待開發）
│
├── docs/                            # 原始需求與設計文檔
│   ├── Chain Fusion 产品功能清单*.md
│   ├── 分布式多链融合网关_系统架构文档_v1.0.md
│   ├── 分布式多链融合网关_程序开发文档_v1.0.md
│   ├── 分布式多链融合网关_软件说明书_v1.0.md
│   └── ...
│
├── proto/                           # 共享 Protobuf 定義（服務間通信）
│   └── gateway/gateway.proto
│
├── gateway-core/                    # 流量網關層（APISIX）+ 路由決策引擎（Go）
│   ├── apisix/
│   │   ├── Dockerfile               # 自定義 APISIX 鏡像（含 Lua 插件）
│   │   ├── conf/
│   │   │   ├── config.yaml          # APISIX 主配置（etcd/TLS/插件列表）
│   │   │   └── apisix.yaml          # 聲明式路由+上游配置（版本管理基準）
│   │   └── plugins/                 # 自定義 Lua 插件
│   │       ├── chain-fusion-auth.lua    # HMAC-SHA512 銀行側鑒權
│   │       ├── compliance-precheck.lua  # 合規前置校驗（調用 compliance-service）
│   │       └── chain-health-route.lua   # 鏈健康度動態路由（調用 route-engine）
│   ├── route-engine/                # [Go] 路由決策服務（僅內網，供 APISIX 調用）
│   │   ├── cmd/main/main.go
│   │   ├── internal/
│   │   │   ├── health/   # 節點健康監控 + 評分寫入 Redis
│   │   │   ├── router/   # 路由決策算法（健康度排序 + 策略選擇）
│   │   │   ├── failover/ # 容災監控 + 告警
│   │   │   └── api/      # HTTP API（/route/decide、/chain/health）
│   │   ├── Dockerfile
│   │   └── go.mod
│   └── scripts/
│       └── sync-routes.sh           # 路由配置同步到 APISIX Admin API
│
├── protocol-adapter/                # [Go] 協議適配層（插件化 SPI）
│   ├── internal/
│   │   ├── chains/
│   │   │   ├── conflux/   # 🔧 需新增（Conflux cfx_ RPC）
│   │   │   ├── ethereum/  # ✅ 對接 walletos eth_rs
│   │   │   ├── bsc/       # ✅ 對接 walletos（chainID=56）
│   │   │   ├── cips/      # 🔴 全新開發（ISO 20022 / CIPS 2.0）
│   │   │   └── mbridge/   # 🔴 全新開發（BIS mBridge API）
│   │   ├── converter/     # 🔴 COBOL↔JSON、ISO20022↔GatewayMessage
│   │   └── plugin/        # SPI 插件注冊表（支持熱插拔）
│   └── go.mod
│
├── transaction-service/             # [Go] 交易處理服務
│   ├── internal/
│   │   ├── handler/    # 交易接收與解析
│   │   ├── validator/  # 參數校驗、余額校驗
│   │   ├── executor/   # 交易轉發 + 🔴 跨鏈原子性保障
│   │   ├── retry/      # 🔧 RocketMQ 重試隊列
│   │   ├── status/     # 交易狀態實時同步
│   │   └── batch/      # 批量交易聚合提交
│   └── go.mod
│
├── compliance-service/              # [Java/Spring Boot] 合規控制服務
│   └── src/main/java/com/chainfusion/compliance/
│       ├── aml/         # 🔴 AML/CFT 校驗 + Drools 規則引擎
│       ├── identity/    # 🔴 DID 身份映射（四級映射體系）
│       ├── rules/       # 🔴 多司法轄區合規規則庫
│       ├── sanctions/   # 🔴 制裁名單（OFAC/UNSC）
│       ├── report/      # 🔴 合規報表生成
│       └── audit/       # 🔴 全鏈路審計日誌
│
├── bank-adapter/                    # [Java/Spring Boot] 銀行側接入適配
│   └── src/main/java/com/chainfusion/bankadapter/
│       ├── rest/        # ✅ REST/HTTP 接入（Spring Cloud Gateway）
│       ├── soap/        # 🔧 SOAP 接入
│       ├── cobol/       # 🔴 COBOL 大型機解析器（EBCDIC/copybook）
│       ├── swift/       # 🔴 SWIFT MT/MX 報文適配
│       └── cips/        # 🔴 CIPS 2.0 協議適配
│
├── admin-service/                   # [Java/Spring Boot] 管理後台
│   └── src/main/java/com/chainfusion/admin/
│       ├── user/        # ✅ 複用 keyvault-api-service 用戶管理
│       ├── role/        # ✅ 複用 keyvault-api-service 角色管理
│       ├── permission/  # ✅ 複用 keyvault-api-service 權限管理
│       ├── sysconfig/   # 🔧 系統配置（節點地址、算法切換）
│       ├── report/      # 🔴 運營/交易/清算報表
│       └── plugin/      # 🔴 插件生命周期管理
│
├── data-sync-service/               # [Go] 數據同步與存證服務
│   ├── internal/
│   │   ├── onchain/     # 🔧 鏈上數據訂閱（擴展 crypto-event-subscriber）
│   │   ├── offchain/    # 🔧 鏈下數據同步與一致性校驗
│   │   ├── reconcile/   # 🔴 清算對賬
│   │   └── proof/       # 🔴 鏈上哈希存證（防篡改）
│   └── go.mod
│
└── deploy/                          # 部署配置
    ├── docker/
    │   └── docker-compose.yml       # 本地開發環境
    ├── k8s/                         # Kubernetes 生産部署（待補充）
    └── config/
        └── prometheus/prometheus.yml
```

## 系統架構

```
銀行核心系統（COBOL / REST / SOAP / SWIFT / CIPS）
                        │
               ┌────────▼────────┐
               │   bank-adapter  │  COBOL解析 / SWIFT / CIPS / SOAP
               └────────┬────────┘
                        │ HTTP/REST
          ┌─────────────▼──────────────┐
          │     Apache APISIX          │  ← 流量網關層
          │  TLS終止 / 限流 / 鑒權      │    OpenResty + LuaJIT + etcd
          │  Lua 插件：                 │    峰值 QPS 十萬級
          │  ├─ chain-fusion-auth       │    毫秒級動態路由熱更新
          │  ├─ compliance-precheck     │
          │  └─ chain-health-route ─┐  │
          └──────────┬──────────────┘  │
                     │                 │ 查詢最優節點
          ┌──────────▼──────┐   ┌──────▼────────┐
          │ transaction-svc │   │ route-engine  │  ← Go 路由決策服務
          │ 交易處理/重試隊列│   │ 健康監控+評分  │    僅內網，不對外暴露
          └──────┬──────────┘   └───────────────┘
                 │                       ↑ 寫入
       ┌─────────┼─────────┐          Redis
       │         │         │       (cf:health:*)
       ▼         ▼         ▼
compliance  protocol-  data-sync
-service    adapter    -service
AML/CFT    Conflux/ETH  鏈上存證
DID映射    BSC/CIPS     鏈下同步

支撐體系：MySQL / Redis / etcd / RocketMQ / ELK / Prometheus+Grafana / Apollo
```

## 快速啟動（本地開發）

```bash
# 啟動所有基礎設施
cd deploy/docker
docker-compose up -d mysql redis rocketmq-namesrv rocketmq-broker elasticsearch prometheus grafana

# 查看服務狀態
docker-compose ps
```

## 開發狀態

詳見 [DEVELOPMENT_STATUS.md](./DEVELOPMENT_STATUS.md)

- ✅ 可複用現有 monorepo 組件（hotwallet / walletos / keyvault-api-service / digiquick-api）
- 🔧 需擴展：Conflux 適配器、動態路由、SM2/SM4 加密
- 🔴 需全新開發：CIPS/SWIFT/COBOL 適配、Drools 合規引擎、DID 映射、制裁名單、跨鏈原子交易

## 技術棧

| 層 | 技術 |
|----|------|
| 流量網關 | Apache APISIX 3.9（OpenResty + LuaJIT） |
| 路由決策引擎 | Go 1.21 |
| 業務服務 | Java 17 + Spring Boot 3.2 |
| 規則引擎 | Drools 9.x |
| 消息隊列 | RocketMQ 4.9+ |
| 緩存 | Redis 7.x 集群 |
| 數據庫 | MySQL 8.0 / PostgreSQL 14+ |
| 日誌 | ELK（Elasticsearch + Logstash + Kibana）|
| 監控 | Prometheus + Grafana |
| 配置中心 | Apollo 2.x |
| 容器化 | Docker + Kubernetes 1.24+ |
| 通信協議 | REST / gRPC / Protobuf |
