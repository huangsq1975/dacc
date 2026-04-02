-- chain-health-route.lua
-- 鏈健康度動態路由插件
-- 調用 route-engine（Go 服務）獲取最優目標鏈節點，動態修改 upstream
--
-- 健康度 = (連通率×40% + 確認延遲達標率×30% + 跨鏈橋成功率×20% + 合規狀態×10%) × 100

local core  = require("apisix.core")
local http  = require("resty.http")
local cjson = require("cjson.safe")

local plugin_name = "chain-health-route"

local schema = {
    type = "object",
    properties = {
        route_engine_url = {
            type    = "string",
            default = "http://route-engine:8090/api/v1/route/decide"
        },
        timeout_ms = {
            type    = "integer",
            default = 100         -- 路由決策必須極快（100ms 內）
        },
        -- 路由優先策略
        strategy = {
            type    = "string",
            enum    = {"compliance_first", "efficiency_first", "cost_first", "health_first"},
            default = "compliance_first"
        },
        -- route-engine 不可達時的降級策略
        fallback = {
            type    = "string",
            enum    = {"default_upstream", "block"},
            default = "default_upstream"
        },
    }
}

local _M = {
    version  = 0.1,
    priority = 2600,
    name     = plugin_name,
    schema   = schema,
}

function _M.check_schema(conf)
    return core.schema.check(schema, conf)
end

function _M.rewrite(conf, ctx)
    local body_str = core.request.get_body()
    if not body_str then return end

    local req = cjson.decode(body_str)
    if not req then return end

    -- 只對跨鏈交易做動態路由
    local source_chain = req["source_chain"]
    local target_chain = req["target_chain"]
    if not source_chain or not target_chain then return end

    local payload = cjson.encode({
        request_id   = core.request.headers(ctx)["x-request-id"] or "",
        source_chain = source_chain,
        target_chain = target_chain,
        tx_type      = req["tx_type"] or "CROSS_BORDER_PAYMENT",
        amount       = req["amount"],
        currency     = req["currency"],
        strategy     = conf.strategy,
    })

    local httpc = http.new()
    httpc:set_timeout(conf.timeout_ms)

    local res, err = httpc:request_uri(conf.route_engine_url, {
        method  = "POST",
        body    = payload,
        headers = {["Content-Type"] = "application/json"},
    })

    if err or not res or res.status ~= 200 then
        core.log.warn("chain-health-route: route-engine unavailable: ", err or res.status)
        if conf.fallback == "block" then
            return 503, {error = "routing service unavailable"}
        end
        -- fallback = default_upstream：使用 apisix.yaml 中配置的靜態 upstream
        return
    end

    local decision = cjson.decode(res.body)
    if not decision or not decision.selected_node then return end

    -- 動態修改本次請求的 upstream（覆蓋靜態配置）
    ctx.var.upstream_host = decision.selected_node
    core.request.set_header(ctx, "X-CF-Selected-Node",  decision.selected_node)
    core.request.set_header(ctx, "X-CF-Health-Score",   tostring(decision.health_score or 0))
    core.request.set_header(ctx, "X-CF-Route-Reason",   decision.route_reason or "")
    core.request.set_header(ctx, "X-CF-Bridge",         decision.bridge or "")

    core.log.info("chain-health-route: selected node=", decision.selected_node,
                  " score=", decision.health_score,
                  " reason=", decision.route_reason)
end

return _M
