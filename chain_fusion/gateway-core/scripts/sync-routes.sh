#!/usr/bin/env bash
# sync-routes.sh — 將 apisix.yaml 路由配置同步到 APISIX Admin API
# 使用場景：CI/CD 部署、路由規則變更時執行
# 用法：./sync-routes.sh [apisix_admin_url] [admin_key]

set -euo pipefail

APISIX_ADMIN=${1:-"http://localhost:9080"}
ADMIN_KEY=${2:-${APISIX_ADMIN_KEY:-"changeme"}}
CONF_DIR="$(cd "$(dirname "$0")/../apisix/conf" && pwd)"
APISIX_YAML="$CONF_DIR/apisix.yaml"

# 確認 PyYAML 可用
python3 -c "import yaml" 2>/dev/null \
  || { echo "ERROR: PyYAML not installed. Run: pip3 install pyyaml" >&2; exit 1; }

echo "==> Syncing routes to APISIX Admin API: $APISIX_ADMIN"
echo "    Config: $APISIX_YAML"

# 等待 APISIX 就緒
until curl -sf "$APISIX_ADMIN/apisix/admin/routes" \
  -H "X-API-KEY: $ADMIN_KEY" > /dev/null 2>&1; do
  echo "    Waiting for APISIX..."
  sleep 2
done
echo "    APISIX is ready."

# 解析 YAML 並輸出指定 section 的 NDJSON（每行一個 JSON 物件）
parse_section() {
  local section=$1
  python3 -c "
import sys, json, yaml
with open(sys.argv[1]) as f:
    conf = yaml.safe_load(f)
for item in conf.get('$section', []):
    print(json.dumps(item))
" "$APISIX_YAML"
}

# 取出 JSON 物件中的 id 欄位
get_id() {
  python3 -c "import sys, json; print(json.load(sys.stdin)['id'])"
}

# PUT 一個資源到 Admin API；非 2xx 時印出錯誤並退出
put_resource() {
  local endpoint=$1   # e.g. /apisix/admin/upstreams/foo
  local payload=$2
  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" \
    -X PUT "${APISIX_ADMIN}${endpoint}" \
    -H "X-API-KEY: $ADMIN_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload")
  if [[ "$http_code" != 2* ]]; then
    echo "    ERROR: HTTP $http_code for PUT $endpoint" >&2
    exit 1
  fi
  echo "$http_code"
}

# ── 同步 upstreams ───────────────────────────────────────────────
echo "==> Syncing upstreams..."
upstream_count=0
while IFS= read -r item_json; do
  item_id=$(echo "$item_json" | get_id)
  printf "    PUT upstream %-35s" "$item_id"
  code=$(put_resource "/apisix/admin/upstreams/$item_id" "$item_json")
  echo "→ $code"
  (( upstream_count++ ))
done < <(parse_section upstreams)
echo "    Synced $upstream_count upstream(s)."

# ── 同步 routes ─────────────────────────────────────────────────
echo "==> Syncing routes..."
route_count=0
while IFS= read -r item_json; do
  item_id=$(echo "$item_json" | get_id)
  printf "    PUT route     %-35s" "$item_id"
  code=$(put_resource "/apisix/admin/routes/$item_id" "$item_json")
  echo "→ $code"
  (( route_count++ ))
done < <(parse_section routes)
echo "    Synced $route_count route(s)."

# ── 驗證 ────────────────────────────────────────────────────────
echo "==> Verifying routes..."
active_routes=$(curl -sf "$APISIX_ADMIN/apisix/admin/routes" \
  -H "X-API-KEY: $ADMIN_KEY" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('count', 0))")
echo "    Active routes in APISIX: $active_routes (pushed: $route_count)"

if (( active_routes < route_count )); then
  echo "WARNING: fewer routes active than pushed — check APISIX logs." >&2
fi

echo "==> Done."
