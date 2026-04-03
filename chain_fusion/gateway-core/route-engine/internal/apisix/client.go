package apisix

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Config APISIX Admin API 連接配置
type Config struct {
	// AdminURL APISIX Admin API 地址，e.g. "http://apisix:9180"
	AdminURL string
	// APIKey X-API-KEY 鑒權值
	APIKey string
	// UpstreamMap chainID → APISIX upstream ID 映射
	// e.g. "ethereum" → "protocol-adapter"
	UpstreamMap map[string]string
}

// Client APISIX Admin API 客戶端
// 用於動態摘除/恢復 upstream 節點，無需重啟 APISIX
type Client struct {
	cfg        Config
	httpClient *http.Client
}

func NewClient(cfg Config) *Client {
	return &Client{
		cfg:        cfg,
		httpClient: &http.Client{Timeout: 5 * time.Second},
	}
}

// RemoveNode 將 upstream 中的節點權重設為 0（APISIX 會跳過零權重節點）
func (c *Client) RemoveNode(upstreamID, nodeAddr string) error {
	return c.setNodeWeight(upstreamID, nodeAddr, 0)
}

// RestoreNode 將 upstream 中的節點權重恢復為 1
func (c *Client) RestoreNode(upstreamID, nodeAddr string) error {
	return c.setNodeWeight(upstreamID, nodeAddr, 1)
}

// UpstreamID 返回 chainID 對應的 APISIX upstream ID；未配置映射時返回 ""
func (c *Client) UpstreamID(chainID string) string {
	return c.cfg.UpstreamMap[chainID]
}

// setNodeWeight 通過 PATCH /apisix/admin/upstreams/{id} 更新單個節點的權重
// APISIX Admin API v3 支持 PATCH 局部更新，僅影響指定節點，不替換整個 upstream
func (c *Client) setNodeWeight(upstreamID, nodeAddr string, weight int) error {
	body, err := json.Marshal(map[string]interface{}{
		"nodes": map[string]int{nodeAddr: weight},
	})
	if err != nil {
		return fmt.Errorf("marshal request body: %w", err)
	}

	url := fmt.Sprintf("%s/apisix/admin/upstreams/%s", c.cfg.AdminURL, upstreamID)
	req, err := http.NewRequest(http.MethodPatch, url, bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-API-KEY", c.cfg.APIKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("apisix admin PATCH upstream/%s: %w", upstreamID, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("apisix admin returned HTTP %d for upstream/%s node=%s weight=%d",
			resp.StatusCode, upstreamID, nodeAddr, weight)
	}
	return nil
}
