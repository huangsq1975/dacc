-- compliance-precheck.lua
-- 交易合規前置校驗插件
-- 在路由至 transaction-service 之前，同步調用 compliance-service 進行 AML/CFT 篩查
-- 超時策略：on_failure = "block"（金融安全優先）或 "pass"（可用性優先）

local core   = require("apisix.core")
local http   = require("resty.http")
local cjson  = require("cjson.safe")

local plugin_name = "compliance-precheck"

local schema = {
    type = "object",
    properties = {
        compliance_service_url = {
            type    = "string",
            default = "http://compliance-service:8080/internal/compliance/check"
        },
        timeout_ms = {
            type    = "integer",
            default = 500
        },
        -- "block"：合規服務異常時攔截交易（金融安全優先）
        -- "pass" ：合規服務異常時放行並標記（可用性優先）
        on_failure = {
            type    = "string",
            enum    = {"block", "pass"},
            default = "block"
        },
    }
}

local _M = {
    version  = 0.1,
    priority = 2700,         -- 在 chain-fusion-auth(2800) 之後、chain-health-route(2600) 之前
    name     = plugin_name,
    schema   = schema,
}

function _M.check_schema(conf)
    return core.schema.check(schema, conf)
end

function _M.rewrite(conf, ctx)
    local body_str = core.request.get_body()
    if not body_str then
        return  -- 非 JSON 請求（如 GET）跳過
    end

    local req_body = cjson.decode(body_str)
    if not req_body then
        return 400, {error = "invalid request body"}
    end

    -- 構造合規校驗請求（只傳必要字段，不傳敏感數據）
    local check_payload = cjson.encode({
        request_id    = core.request.headers(ctx)["x-request-id"] or "",
        sender_wallet = req_body["sender_wallet"],
        receiver_wallet = req_body["receiver_wallet"],
        sender_did    = req_body["sender_did"],
        receiver_did  = req_body["receiver_did"],
        amount        = req_body["amount"],
        currency      = req_body["currency"],
        jurisdiction  = req_body["jurisdiction"] or "GLOBAL",
    })

    local httpc = http.new()
    httpc:set_timeout(conf.timeout_ms)

    local res, err = httpc:request_uri(conf.compliance_service_url, {
        method  = "POST",
        body    = check_payload,
        headers = {
            ["Content-Type"]        = "application/json",
            ["X-Internal-Call"]     = "apisix-precheck",
            ["X-CF-Verified-Key"]   = ctx.var["http_x_cf_verified_key"] or "",
        },
    })

    if err or not res then
        core.log.error("compliance-precheck: service error: ", err)
        if conf.on_failure == "block" then
            return 503, {error = "compliance service unavailable, transaction blocked"}
        end
        -- on_failure == "pass"：標記後放行
        core.request.set_header(ctx, "X-CF-Compliance-Bypassed", "true")
        return
    end

    if res.status ~= 200 then
        core.log.warn("compliance-precheck: service returned ", res.status)
        if conf.on_failure == "block" then
            return 503, {error = "compliance check failed"}
        end
        return
    end

    local result = cjson.decode(res.body)
    if not result then
        return 502, {error = "compliance service returned invalid response"}
    end

    if not result.passed then
        core.log.warn("compliance-precheck: transaction BLOCKED, risk=", result.risk_level,
                      " violations=", cjson.encode(result.violations or {}))
        return 403, {
            error      = "transaction blocked by compliance check",
            risk_level = result.risk_level,
            violations = result.violations,
            report_id  = result.report_id,
        }
    end

    -- 合規通過：將風險等級注入上游請求頭
    core.request.set_header(ctx, "X-CF-Risk-Level",  result.risk_level or "LOW")
    core.request.set_header(ctx, "X-CF-Report-Id",   result.report_id  or "")
end

return _M
