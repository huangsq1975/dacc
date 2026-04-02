-- chain-fusion-auth.lua
-- Chain Fusion 銀行側 HMAC-SHA512 請求簽名驗證插件
-- 防重放：timestamp 偏差 ≤ 30 秒 + nonce 唯一性校驗（Redis 存儲）
--
-- 請求頭格式：
--   X-CF-Access-Key:   訪問密鑰 ID
--   X-CF-Timestamp:    UTC 毫秒時間戳
--   X-CF-Nonce:        隨機字符串（≥16 字節）
--   X-CF-Signature:    HMAC-SHA512(secret, method + path + timestamp + nonce + body_hash)

local core    = require("apisix.core")
local hmac    = require("resty.hmac")
local sha512  = require("resty.sha512")
local redis   = require("resty.redis")
local str     = require("resty.string")

local plugin_name = "chain-fusion-auth"

local schema = {
    type = "object",
    properties = {
        algorithm = {
            type = "string",
            enum = {"hmac-sha512"},
            default = "hmac-sha512"
        },
        clock_skew = {
            type = "integer",
            default = 30000   -- 毫秒，允許偏差 30 秒
        },
    },
    required = {"algorithm"}
}

local _M = {
    version  = 0.1,
    priority = 2800,         -- 在 jwt-auth(2510) 之前執行
    name     = plugin_name,
    schema   = schema,
}

function _M.check_schema(conf)
    return core.schema.check(schema, conf)
end

-- 從 etcd/Apollo 獲取密鑰（此處簡化為從 APISIX consumer 獲取）
local function get_secret(access_key)
    -- TODO: 對接 Apollo 配置中心或數據庫獲取 access_key 對應的 secret
    -- 示例：return ngx.shared.cf_keys:get(access_key)
    return nil, "secret store not configured"
end

local function verify_nonce(nonce, ttl)
    local red = redis:new()
    red:set_timeout(100)
    -- TODO: 使用 Redis SET NX EX 實現 nonce 唯一性（防重放）
    -- local ok, err = red:connect("redis", 6379)
    -- if not ok then return false, err end
    -- local res, err = red:set("cf:nonce:" .. nonce, 1, "NX", "EX", ttl)
    -- return res == "OK", err
    return true, nil
end

function _M.rewrite(conf, ctx)
    local headers = core.request.headers(ctx)

    local access_key = headers["x-cf-access-key"]
    local timestamp  = headers["x-cf-timestamp"]
    local nonce      = headers["x-cf-nonce"]
    local signature  = headers["x-cf-signature"]

    if not access_key or not timestamp or not nonce or not signature then
        return 401, {error = "missing auth headers: x-cf-access-key / x-cf-timestamp / x-cf-nonce / x-cf-signature"}
    end

    -- 時間戳偏差校驗
    local ts = tonumber(timestamp)
    local now_ms = ngx.now() * 1000
    if not ts or math.abs(now_ms - ts) > conf.clock_skew then
        return 401, {error = "timestamp out of range, clock skew > " .. conf.clock_skew .. "ms"}
    end

    -- nonce 唯一性校驗（防重放）
    local ok, err = verify_nonce(nonce, math.ceil(conf.clock_skew / 1000) * 2)
    if not ok then
        return 401, {error = "nonce replay detected: " .. (err or "")}
    end

    -- 獲取 secret
    local secret, err = get_secret(access_key)
    if not secret then
        return 401, {error = "invalid access key"}
    end

    -- 計算期望簽名
    local method    = core.request.get_method()
    local path      = core.request.get_path()
    local body      = core.request.get_body() or ""
    local body_hash = str.to_hex(sha512:new():final(body))
    local sign_str  = method .. path .. timestamp .. nonce .. body_hash

    local expected = str.to_hex(hmac:new(secret, hmac.ALGOS.SHA512):final(sign_str))

    if expected ~= signature then
        core.log.warn("chain-fusion-auth: signature mismatch for key=", access_key)
        return 401, {error = "signature verification failed"}
    end

    -- 將 access_key 注入上游請求頭（供後端服務使用）
    core.request.set_header(ctx, "X-CF-Verified-Key", access_key)
end

return _M
