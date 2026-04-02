FROM apache/apisix:3.9.0-debian

# 安裝 lua-resty-hmac（HMAC 簽名驗證依賴）
RUN apt-get update && apt-get install -y luarocks && \
    luarocks install lua-resty-hmac && \
    apt-get clean

# 複製自定義 Lua 插件
COPY plugins/ /usr/local/apisix/plugins/chain-fusion/

# 複製 APISIX 主配置
COPY conf/config.yaml /usr/local/apisix/conf/config.yaml

EXPOSE 9080 9443 9091
