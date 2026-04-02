# Chain Fusion 開發狀態追蹤

**版本：** v1.0
**最後更新：** 2026-04-02
**說明：** 本文件追蹤各模塊的開發狀態，區分「可複用現有 monorepo 組件」、「需要擴展」、「需要全新開發」三類。

---

## 圖例

| 符號 | 含義 |
|------|------|
| ✅ | 已完成（可直接複用） |
| 🔧 | 需要擴展現有組件 |
| 🔴 | 需要全新開發 |
| ⏳ | 開發中 |

---

## 一、可直接複用的現有組件

以下模塊在 `../` 目錄的現有 monorepo 中已實現，Chain Fusion 可通過服務調用或代碼複用的方式直接使用，**無需重新開發**。

### 1.1 HSM 密鑰管理與交易簽名 ✅

- **對應組件：** `../hotwallet`（完成度 85-90%）
- **可複用能力：**
  - Thales Luna HSM / CloudHSM / SoftHSM 集成（PKCS#11）
  - ECDSA secp256k1 簽名（ETH/BSC 兼容）
  - 密鑰生命周期管理（生成、存儲、輪換）
  - 地址管理（HSM Address 模塊）
- **複用方式：** 在 `gateway-core` 的安全防護層直接調用 hotwallet gRPC/REST 接口
- **注意：** 國密 SM2 簽名需額外開發（hotwallet 僅支持 ECDSA）

---

### 1.2 以太坊 / BSC 多鏈 RPC 操作 ✅

- **對應組件：** `../walletos`（完成度 70-80%）
- **可複用能力：**
  - ETH JSON-RPC（eth_sendRawTransaction、eth_getTransactionReceipt 等）
  - BSC（與 ETH 兼容，可直接切換 chainID=56）
  - Bitcoin、Cosmos、Avalanche、Flow、NEAR、Solana 的 RPC 操作
  - 統一 JSON-RPC 抽象接口
- **複用方式：** `protocol-adapter` 中的 `ethereum/adapter.go` 直接對接 walletos JSON-RPC endpoint
- **不足：** 缺少 Conflux、CIPS 聯盟鏈支持（需新增插件）

---

### 1.3 用戶、角色、權限管理 ✅

- **對應組件：** `../keyvault-api-service`（完成度 75-80%）
- **可複用能力：**
  - 多類型用戶增刪改凍
  - 角色管理與權限控制（RBAC）
  - FIDO2/WebAuthn 認證
  - Kafka 事件消費
  - 審批流程（Approval Task）
  - 通知系統
- **複用方式：** `admin-service` 可直接複用 keyvault-api-service 的用戶/角色/權限模塊，或通過 API 調用
- **需補充：** 添加「合規管理員」、「接口對接員」等 Chain Fusion 特有角色

---

### 1.4 鏈上事件訂閱與狀態同步 ✅

- **對應組件：** `../crypto-event-subscriber` + Kafka（完成度 65-70%）
- **可複用能力：**
  - Webhook 回調處理（CryptoAPIs / AegisAPIs 兩個 provider）
  - Kafka 消息生産/消費
  - 交易狀態追蹤與數據庫持久化
  - 訂閱管理
- **複用方式：** `data-sync-service` 的鏈上數據同步模塊直接對接 crypto-event-subscriber
- **注意：** Chain Fusion 文檔指定使用 RocketMQ，需評估是否統一到 Kafka 或並行維護

---

### 1.5 RWA 代幣化 ✅

- **對應組件：** `../digiquick-api`（完成度 80-85%）
- **可複用能力：**
  - 多類型資產管理（ARTWORK / BONDS / EQUIPMENT / FUNDS / GROUNDWATER / TRADE_DEBT）
  - 多簽控制器
  - KYC 集成
  - IPFS/Pinata 文件存儲
  - GraphQL API
  - 審批工作流
- **複用方式：** Chain Fusion 的「數字資產全生命周期管理」場景直接使用 digiquick-api

---

### 1.6 API 網關鑒權（HMAC 簽名驗證） ✅

- **對應組件：** `../keyvault-gateway`（完成度 60%）
- **可複用能力：**
  - HMAC-SHA512 請求簽名驗證
  - 時間戳 + nonce 防重放攻擊
  - 速率限制
  - Ed25519 密鑰對生成
- **複用方式：** `gateway-core` 的 middleware 層直接複用 keyvault-gateway 的簽名驗證邏輯

---

### 1.7 基礎 AML 校驗 ✅（部分）

- **對應組件：** `../hotwallet` AML 模塊（基礎實現）
- **可複用能力：** 基本 AML 校驗邏輯
- **不足：** 不支持多司法轄區規則、無 Drools 規則引擎、無制裁名單對接 → 需升級為全功能合規引擎

---

## 二、需要擴展的現有組件

### 2.1 walletos 新增 Conflux 適配器 🔧

- **服務：** `protocol-adapter/internal/chains/conflux/`
- **工作：** walletos 採用插件化架構，新增 Conflux JSON-RPC 適配器
- **工作量：** 中（1-2 週）
- **要點：**
  - Conflux 使用 `cfx_` 前綴 RPC（與 ETH `eth_` 有差異）
  - 支持 Conflux 的 epoch 確認機制
  - 樹圖（Tree-Graph）賬本結構的交易狀態查詢

---

### 2.2 動態路由增強 🔧

- **服務：** `gateway-core/route-engine/`（Go）+ `gateway-core/apisix/plugins/`（Lua）
- **架構調整：** ~~Go HTTP server~~ → **Apache APISIX（流量網關）+ Go route-engine（路由決策）**
- **工作量：** 中（2-3 週）
- **已完成骨架：**
  - APISIX 主配置（`config.yaml`）、聲明式路由（`apisix.yaml`）
  - 3 個自定義 Lua 插件：`chain-fusion-auth`、`compliance-precheck`、`chain-health-route`
  - Go route-engine：健康監控、路由決策、容災監控
- **待實現：**
  - 真實節點探測邏輯（Gas 查詢、跨鏈橋探測）
  - APISIX Admin API 動態 upstream 摘除/恢復
  - `sync-routes.sh` 完整的 YAML 解析與同步邏輯
  - 多種負載均衡算法（加權輪詢、最少連接）

---

### 2.3 交易狀態同步升級 🔧

- **服務：** `transaction-service/`、`data-sync-service/`
- **工作：** 在 crypto-event-subscriber 基礎上增加跨鏈狀態追蹤
- **工作量：** 中（2-3 週）
- **要點：**
  - 端到端延遲監控（目標 ≤ 3.5 秒）
  - 批量交易聚合提交
  - RocketMQ 重試隊列（現有 monorepo 用 Kafka，需評估統一）

---

### 2.4 國密 SM2/SM4 加密支持 🔧

- **服務：** `gateway-core/internal/middleware/`、`compliance-service/`
- **工作：** 在現有 ECDSA/AES-256 基礎上增加國密算法
- **工作量：** 小-中（1-2 週）
- **要點：**
  - SM2 非對稱加密（替代 ECDSA，對接中國監管要求）
  - SM4 對稱加密（替代 AES-256，用於數據存儲加密）
  - 算法配置動態切換

---

## 三、需要全新開發的模塊

以下模塊在現有 monorepo 中**完全空白**，必須從頭開發。

### 3.1 🔴 CIPS 協議適配器

- **服務：** `protocol-adapter/internal/chains/cips/`、`bank-adapter/src/main/java/.../cips/`
- **工作量：** 大（4-6 週）
- **說明：** 人民幣跨境支付系統協議適配，支持 ISO 20022 報文（pacs.008 支付指令、camt.028 查詢等）
- **依賴：** 需獲取 CIPS 官方 SDK 或接口文檔授權，需與 CIPS 系統進行聯調測試
- **風險：** ⚠️ CIPS 接口為受限協議，對外開放程度有限，需提前確認接入資質

---

### 3.2 🔴 SWIFT 協議適配器

- **服務：** `bank-adapter/src/main/java/.../swift/`
- **工作量：** 大（4-6 週）
- **說明：** 支持 SWIFT MT103/MT202（FIN 格式）及 SWIFT MX（ISO 20022 XML 格式）的解析與生成
- **依賴：** 需要 SWIFT Alliance Gateway 接入資質（SWIFT 成員資格或合作機構授權）
- **風險：** ⚠️ SWIFT 接入需審批流程，周期較長，建議優先確認業務需求

---

### 3.3 🔴 COBOL 大型機協議解析器

- **服務：** `bank-adapter/src/main/java/.../cobol/`、`protocol-adapter/internal/converter/`
- **工作量：** 大（3-5 週）
- **說明：**
  - EBCDIC ↔ UTF-8 字符集轉換
  - COBOL copybook 定義解析（固定寬度欄位）
  - COBOL 特殊數據類型處理（COMP-3 壓縮十進制、REDEFINES 等）
  - 基於 Netty 建立 TCP 長連接（或對接 IBM MQ Series）
- **依賴：** 需獲取目標銀行的 COBOL copybook 文件；需要目標銀行提供測試環境
- **風險：** ⚠️ 每個銀行的 COBOL 結構不同，可能需要為每個客戶定製

---

### 3.4 🔴 Drools 合規規則引擎

- **服務：** `compliance-service/src/main/java/.../rules/`
- **工作量：** 大（4-6 週）
- **說明：**
  - 基於 Drools 的動態規則配置與執行
  - 多司法轄區規則庫（EU/GDPR/MiCA、中國 AML、香港 SFC、FATF 旅行規則、金磚國家 mBridge）
  - 合規規則熱更新（無需重啟服務）
  - 機器學習模型集成（可疑交易識別）

---

### 3.5 🔴 制裁名單管理系統

- **服務：** `compliance-service/src/main/java/.../sanctions/`
- **工作量：** 中（2-3 週）
- **說明：**
  - 對接 OFAC SDN 制裁名單、UNSC 制裁名單、EU 制裁名單、HM Treasury 制裁名單
  - 定時自動更新（每日或收到官方推送時立即更新）
  - Redis 緩存加速查詢（交易前實時比對）
  - 支持自定義風險名單導入（CSV 格式）
- **依賴：** 需訂閱 OFAC API、UNSC 數據推送等外部數據源

---

### 3.6 🔴 DID 身份映射系統

- **服務：** `compliance-service/src/main/java/.../identity/`
- **工作量：** 中（2-3 週）
- **說明：**
  - 建立「銀行賬戶 → 法定身份 → DID → 錢包地址」四級映射
  - 符合 W3C DID 標準
  - 映射關係鏈上哈希存證（不可篡改）
  - 映射關係鏈下 AES-256/SM4 加密存儲
  - 旅行規則合規：拒絕匿名錢包地址發起的交易
- **依賴：** 對接 eIDAS（歐盟）或 VerifySeal 等合規數字身份服務商

---

### 3.7 🔴 跨鏈原子交易保障

- **服務：** `transaction-service/internal/executor/`
- **工作量：** 大（4-6 週）
- **說明：** 確保跨鏈操作「全部成功或全部回滾」，實現跨鏈原子性
- **技術方案待定：**
  - 兩階段提交（2PC）
  - Hash Time Lock Contract（HTLC）
  - 跨鏈原子互換（Atomic Swap）
- **風險：** ⚠️ 技術難度高，需根據實際接入的鏈選定方案

---

### 3.8 🔴 跨鏈橋接管理模塊

- **服務：** `protocol-adapter/internal/chains/mbridge/`、`gateway-core/internal/router/`
- **工作量：** 中（2-3 週）
- **說明：**
  - 合規跨鏈橋的接入與配置（插件化）
  - 跨鏈橋健康狀態監控與自動故障切換
  - mBridge 官方 API 對接
- **依賴：** 需獲取 mBridge 官方技術文檔（目前為 BIS 主導的受限項目）

---

### 3.9 🔴 合規報表系統

- **服務：** `compliance-service/src/main/java/.../report/`、`admin-service/src/main/java/.../report/`
- **工作量：** 中（2-3 週）
- **說明：**
  - 自動生成多語言、多辖区合規報表（PDF/Excel/CSV）
  - 報表生成時效 ≤ 1 小時
  - 報表加密導出（需授權才能打印/下載）
  - 數據留存 ≥ 7 年（加密歸檔）

---

### 3.10 🔴 Apollo 配置中心集成

- **涉及：** 全部服務
- **工作量：** 小-中（1-2 週）
- **說明：** 所有服務的配置通過 Apollo 配置中心統一管理，支持動態下發和灰度發布

---

### 3.11 🔴 mBridge / eCNY 協議適配器

- **服務：** `protocol-adapter/internal/chains/mbridge/`
- **工作量：** 大（視官方 API 開放情況而定）
- **說明：** 對接 mBridge（多邊央行數字貨幣橋）和 eCNY（數字人民幣）
- **風險：** ⚠️ mBridge 為 BIS 主導的受限項目，eCNY 接口由中國人民銀行管理，接入資質要求嚴格

---

## 四、開發工作量彙總

| 模塊 | 狀態 | 工作量估算 | 依賴/風險 |
|------|------|-----------|----------|
| HSM 密鑰管理 | ✅ 可複用 hotwallet | 0 | SM2 需補充 |
| ETH/BSC RPC | ✅ 可複用 walletos | 0 | — |
| 用戶/角色/權限 | ✅ 可複用 keyvault-api-service | 0 | 添加 CF 角色 |
| 鏈上事件同步 | ✅ 可複用 crypto-event-subscriber | 0 | MQ 統一評估 |
| RWA 代幣化 | ✅ 可複用 digiquick-api | 0 | — |
| API 網關鑒權 | ✅ 可複用 keyvault-gateway | 0 | — |
| Conflux 適配器 | 🔧 擴展 walletos | 1-2 週 | — |
| 動態路由引擎 | 🔧 APISIX+Go（骨架已建） | 2-3 週 | Lua 插件開發能力 |
| 交易狀態同步升級 | 🔧 擴展 crypto-event-subscriber | 2-3 週 | MQ 方案 |
| 國密 SM2/SM4 | 🔧 補充現有加密層 | 1-2 週 | — |
| CIPS 協議適配 | 🔴 全新開發 | 4-6 週 | ⚠️ 需接入資質 |
| SWIFT 協議適配 | 🔴 全新開發 | 4-6 週 | ⚠️ 需成員資格 |
| COBOL 解析器 | 🔴 全新開發 | 3-5 週 | ⚠️ 每客戶定製 |
| Drools 合規引擎 | 🔴 全新開發 | 4-6 週 | ML 模型 |
| 制裁名單系統 | 🔴 全新開發 | 2-3 週 | 外部數據源 |
| DID 身份映射 | 🔴 全新開發 | 2-3 週 | eIDAS/VerifySeal |
| 跨鏈原子交易 | 🔴 全新開發 | 4-6 週 | ⚠️ 技術方案待定 |
| 跨鏈橋管理 | 🔴 全新開發 | 2-3 週 | mBridge 授權 |
| 合規報表系統 | 🔴 全新開發 | 2-3 週 | — |
| Apollo 配置集成 | 🔴 全新開發 | 1-2 週 | — |
| mBridge/eCNY 適配 | 🔴 全新開發 | 待定 | ⚠️ 受限項目 |

**預計總工時（新開發部分）：約 38-58 週（人週），建議 4-6 人並行開發**

---

## 五、優先開發順序建議

### Phase 1 — 核心網關骨架（6-8 週）
1. `gateway-core`：服務啟動、健康監控、基礎路由
2. `protocol-adapter`：ETH/BSC（對接 walletos）+ Conflux 適配器
3. `transaction-service`：交易接收、校驗、轉發、狀態查詢
4. 基礎設施：Docker Compose、Prometheus/Grafana、Apollo

### Phase 2 — 合規與銀行接入（8-12 週）
5. `compliance-service`：AML 基礎校驗 + 制裁名單 + DID 映射
6. `bank-adapter`：REST/SOAP 接入（COBOL 最後做）
7. `gateway-core`：動態路由完整實現

### Phase 3 — 高級功能（12-20 週）
8. CIPS 協議適配（需先確認接入資質）
9. SWIFT 協議適配（需先確認資質）
10. Drools 合規規則引擎 + 多司法轄區
11. 跨鏈原子交易
12. COBOL 大型機解析器（針對具體客戶）
13. mBridge/eCNY（視授權情況）

---

## 六、關鍵外部依賴清單（需提前確認）

| 外部依賴 | 用途 | 獲取方式 | 優先級 |
|---------|------|---------|-------|
| CIPS SDK / 接口文檔 | CIPS 聯盟鏈對接 | 向中國人民銀行/CIPS 系統申請 | 高 |
| SWIFT Alliance Gateway | SWIFT 報文收發 | 申請 SWIFT 成員或合作機構授權 | 高 |
| OFAC SDN API | 制裁名單實時查詢 | 訂閱 OFAC 數據服務 | 中 |
| UNSC 制裁名單 | 聯合國制裁名單 | 訂閱聯合國數據服務 | 中 |
| mBridge 技術文檔 | mBridge 協議對接 | 通過 BIS 或 NDB 獲取 | 中 |
| eCNY 接口文檔 | 數字人民幣對接 | 向中國人民銀行申請 | 中 |
| eIDAS / VerifySeal | DID 合規身份服務 | 商業合作 | 低 |
| 目標銀行 COBOL copybook | COBOL 解析 | 向各銀行客戶索取 | 按需 |
