#!/usr/bin/env bash
# sync-routes.sh — 將 apisix.yaml 路由配置同步到 APISIX Admin API
# 使用場景：CI/CD 部署、路由規則變更時執行
# 用法：./sync-routes.sh [apisix_admin_url] [admin_key]

set -euo pipefail

APISIX_ADMIN=${1:-"http://localhost:9080"}
ADMIN_KEY=${2:-${APISIX_ADMIN_KEY:-"changeme"}}
CONF_DIR="$(cd "$(dirname "$0")/../apisix/conf" && pwd)"

echo "==> Syncing routes to APISIX Admin API: $APISIX_ADMIN"

# 等待 APISIX 就緒
until curl -sf "$APISIX_ADMIN/apisix/admin/routes" \
  -H "X-API-KEY: $ADMIN_KEY" > /dev/null 2>&1; do
  echo "    Waiting for APISIX..."
  sleep 2
done
echo "    APISIX is ready."

# 同步 upstreams
echo "==> Syncing upstreams..."
# TODO: 解析 apisix.yaml 並通過 Admin API 逐條 PUT

# 同步 routes
echo "==> Syncing routes..."
# TODO: 解析 apisix.yaml 並通過 Admin API 逐條 PUT

# 驗證
echo "==> Verifying routes..."
ROUTE_COUNT=$(curl -sf "$APISIX_ADMIN/apisix/admin/routes" \
  -H "X-API-KEY: $ADMIN_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('count',0))")
echo "    Active routes: $ROUTE_COUNT"

echo "==> Done."
