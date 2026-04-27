# 改進項目清單

本文件記錄專案中發現的技術問題與改進建議，依優先級排列。

---

## P0 — 嚴重問題

### 1. 中文路由未註冊

**位置：** `src/router/config.tsx`

`src/pages/` 中存在 12 個中文頁面元件（`home/page.tsx`、`blog/page.tsx` 等），但 `src/router/config.tsx` **只有英文路由**。中文頁面目前是以 wrapper 方式繞行：import 英文元件後在 `useEffect` 呼叫 `i18n.changeLanguage('zh')`，並非獨立路由。

**影響：**
- 中文版無法透過獨立 URL 直接訪問（SEO 問題）
- 語言切換依賴 cookie/localStorage，不在 URL 體現
- 爬蟲只能索引英文版內容

**建議：** 在 router config 補齊對應的中文路由（如 `/zh`、`/zh/blog` 等），並將現有 wrapper 頁面轉為實體路由。

---

## P1 — 高優先級

### 2. 大量重複代碼

#### 2a. AdvisorsCarousel 元件

**位置：** `src/components/feature/AdvisorsCarouselEN.tsx` / `AdvisorsCarouselZH.tsx`

兩個檔案共享約 **85% 相同代碼**（180+ 行），包含完全相同的 `useState`、`useRef`、`useEffect`、`checkScroll`、`scrollLeft`、`scrollRight`、`goToSlide` 和自動滾動邏輯。差異僅在 `advisors` 資料陣列。

附帶 bug：`AdvisorsCarouselZH.tsx` **缺少** `handleImageError()` 圖片容錯處理，而 EN 版有實作。

**建議：** 提取共用 `useCarousel()` hook，以 `advisors` 資料作為 props 傳入單一 `AdvisorsCarousel` 元件，同時修補 ZH 版缺失的圖片錯誤處理。

#### 2b. 導航列與頁尾重複

**位置：** 所有 `src/pages/*/page.tsx`

每個頁面都內嵌完整的導航列（~150–200 行）和頁尾（~70–100 行），全部複製貼上。估計共有 **3,000+ 行重複代碼**。

**建議：** 提取為共用的 `<Navbar />` 和 `<Footer />` 元件，集中管理導航連結與語言切換邏輯。

---

### 3. OGL 套件未做代碼拆分

**位置：** `vite.config.ts`、`src/pages/home-en/page.tsx`

`ogl`（WebGL 套件，約 80KB）是所有頁面共用 bundle 的一部分，但實際上只在首頁使用。用戶訪問 `/contact` 或 `/blog` 時也會下載這 80KB。

**建議：** 在 `vite.config.ts` 設定 `manualChunks` 將 OGL 拆成獨立 chunk，並對首頁的 Prism 元件使用 `React.lazy` + 動態 `import()`：

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['react', 'react-dom', 'react-router-dom'],
        'ogl': ['ogl'],
      }
    }
  }
}
```

---

### 4. API Endpoint 硬編碼

**位置：** `src/pages/contact-en/page.tsx`、`src/pages/contact/page.tsx`

聯絡表單 endpoint 直接寫死在源碼中：
```
https://readdy.ai/api/form/d6juo8vrgrhbthj8n4og  (EN)
https://readdy.ai/api/form/d6juo8vrgrhbthj8n4o0  (ZH)
```

**建議：** 移至 Vite 環境變數（`.env`）：
```
VITE_CONTACT_FORM_EN=https://readdy.ai/api/form/...
VITE_CONTACT_FORM_ZH=https://readdy.ai/api/form/...
```
並在代碼中以 `import.meta.env.VITE_CONTACT_FORM_EN` 引用。

---

## P2 — 中優先級

### 5. Production 建置包含 Source Map

**位置：** `vite.config.ts`

```typescript
build: {
  sourcemap: true,  // 所有環境皆開啟
}
```

Source map 會將原始 TypeScript 源碼暴露給用戶端，造成安全疑慮（商業邏輯外洩）。

**建議：** 改為依環境判斷：
```typescript
build: {
  sourcemap: process.env.NODE_ENV !== 'production',
}
```

---

### 6. WebGL Renderer 資源未明確釋放

**位置：** `src/pages/home-en/page.tsx`（useEffect cleanup，約第 225–234 行）

目前 cleanup 有正確停止 RAF 並斷開 ResizeObserver / IntersectionObserver，但 `renderer`（OGL Renderer 實例）本身沒有 `dispose()` 或 WebGL context 的 `loseContext()` 呼叫，可能在元件卸載後殘留 GPU 資源。

**建議：** 查閱 OGL 文件確認 Renderer 的釋放 API，並在 cleanup 中加入：
```typescript
if (renderer?.gl) {
  const ext = renderer.gl.getExtension('WEBGL_lose_context');
  ext?.loseContext();
}
```

---

### 7. 部分 i18n 字串未翻譯

**位置：** `src/i18n/local/zh/home.ts`

中文翻譯檔中有若干字串仍為英文，例如：
- `home_hero_title_highlight: "Tokenization"`
- `home_hero_subtitle: "Pioneering..."`（與英文版完全相同）

**建議：** 逐一核查 ZH 翻譯檔，確保所有 key 都有對應中文內容。

---

### 8. 開發伺服器暴露至外部網路

**位置：** `vite.config.ts`

```typescript
server: {
  host: '0.0.0.0',  // 監聽所有網路介面
}
```

在本機開發時，`0.0.0.0` 會使 dev server 對同網路的其他裝置可見。

**建議：** 若非刻意需要在行動裝置測試，改為 `host: 'localhost'`，或透過 CLI flag 按需開啟（`vite --host`）。

---

## P3 — 低優先級

### 9. 鍵盤可及性不足

**位置：** 各頁面導航列

- 下拉式選單只回應 `mouseenter`/`mouseleave`，無法用鍵盤觸發
- 行動版漢堡選單無 ESC 鍵關閉
- 選單開啟時無 focus trap，Tab 鍵會跳出選單範圍
- 互動元件缺少可見的 focus 指示器（`:focus-visible` 樣式）

---

### 10. 部分圖片缺少 alt 屬性

**位置：** `src/pages/blog-en/page.tsx`、部分 use-case 頁面

`AdvisorsCarouselEN.tsx` 有完整的 `alt={advisor.name}`，但 blog 頁面的文章圖片有缺漏。

---

### 11. Prism 元件中有未使用的參數

**位置：** `src/pages/home-en/page.tsx`（約第 13、21、46 行）

`animationType` 與 `hoverStrength`（`HOVSTR`）參數在 Prism shader 中已計算但從未實際使用，屬於無效代碼。

---

### 12. TypeScript strict 模式未開啟

**位置：** `tsconfig.app.json`

```json
"strict": false,
"noUnusedLocals": false,
"noUnusedParameters": false,
```

目前代碼品質尚可，但缺乏嚴格類型檢查會隨專案規模擴大而累積問題。建議逐步開啟 strict mode（可先從 `strictNullChecks: true` 開始）。

---

## 優先級總覽

| # | 問題 | 優先級 | 影響範圍 |
|---|------|--------|---------|
| 1 | ZH 路由未註冊 | P0 | SEO、中文用戶可及性 |
| 2 | AdvisorsCarousel 代碼重複 + ZH bug | P1 | 維護成本、功能缺陷 |
| 3 | Nav/Footer 代碼重複 | P1 | 維護成本 |
| 4 | OGL 未做代碼拆分 | P1 | 所有非首頁的載入效能 |
| 5 | API endpoint 硬編碼 | P1 | 部署彈性、安全 |
| 6 | Source map 暴露生產源碼 | P2 | 安全 |
| 7 | WebGL Renderer 資源洩漏風險 | P2 | 首頁記憶體管理 |
| 8 | 部分 i18n 字串未翻譯 | P2 | 中文用戶體驗 |
| 9 | Dev server 暴露至外網 | P2 | 本機開發安全 |
| 10 | 鍵盤可及性不足 | P3 | 無障礙 |
| 11 | 圖片缺少 alt 屬性 | P3 | 無障礙、SEO |
| 12 | Prism 未使用參數 | P3 | 代碼清潔度 |
| 13 | strict mode 未開啟 | P3 | 長期代碼品質 |
