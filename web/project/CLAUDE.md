# CLAUDE.md（專案協作指南）

本文件提供給 Claude（或任何協作者/AI 代理）快速理解與安全修改此專案所需的**技術架構、目錄約定、指令、部署注意事項與修改規範**。

---

## 技術棧總覽

- **Runtime/Build**：Node.js（搭配 Vite）
- **前端框架**：React 19
- **語言**：TypeScript
- **路由**：`react-router-dom`（以 `useRoutes` + `BrowserRouter` 實作）
- **樣式**：Tailwind CSS + PostCSS + Autoprefixer（並搭配自訂 CSS 動畫於 `src/index.css`）
- **多語系**：i18next + `i18next-browser-languagedetector` + `react-i18next`
  - 專案目前主要以「**中/英兩套 page component 與兩套路由**」落地（而非大量在頁面內呼叫 `useTranslation()`）。
- **視覺/動效**：`ogl`（WebGL）用於首頁 Prism 動態背景
- **外部服務**：
  - 表單提交：`readdy.ai` 表單 API（Contact 頁）
  - 圖片素材：多處使用 `readdy.ai/api/search-image?...` 以及 `static.readdy.ai` 圖片 URL

---

## 專案指令（package scripts）

以 PowerShell/命令列在專案根目錄執行：

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

對應行為（來自 `package.json`）：
- **dev**：Vite dev server
- **build**：`tsc -b` 後再 `vite build`（產出目錄見下方）
- **preview**：本機預覽 build 產物
- **lint**：`eslint .`

---

## 目錄結構與關鍵入口

- **HTML 入口**：`index.html`
  - 掛載點：`<div id="root"></div>`
  - 入口腳本：`/src/main.tsx`
- **React 入口**：`src/main.tsx`
  - 會載入：`./i18n`、`./index.css`，並渲染 `<App />`
- **Router 容器**：`src/App.tsx`
  - `BrowserRouter basename={import.meta.env.BASE_URL}`
- **路由**：
  - `src/router/config.tsx`：所有 `RouteObject[]` 路由表
  - `src/router/index.ts`：`AppRoutes()` 使用 `useRoutes(routes)`
    - 並將 `navigate` 暴露到 `window.REACT_APP_NAVIGATE`（同時提供 `navigatePromise`）
- **頁面**：`src/pages/**/page.tsx`
  - 通常一個功能頁會有：
    - 中文：`src/pages/<name>/page.tsx`
    - 英文：`src/pages/<name>-en/page.tsx`
- **元件**：`src/components/**`
  - 目前可見：`src/components/feature/AdvisorsCarouselZH.tsx`、`AdvisorsCarouselEN.tsx`
- **多語系初始化**：`src/i18n/index.ts`
  - 翻譯資源聚合：`src/i18n/local/index.ts`（使用 `import.meta.glob`）
- **全域樣式**：`src/index.css`
- **Tailwind 設定**：`tailwind.config.ts`
- **PostCSS 設定**：`postcss.config.ts`

---

## 路由/語系策略（重要）

此專案採用「**路徑級別的雙語頁面**」設計：

- 首頁：
  - `/zh`：中文首頁（`src/pages/home/page.tsx`）
  - `/en` 或 `/`：英文首頁（`src/pages/home-en/page.tsx`；目前 `/` 對應 `HomeEN`）
- 其他頁面也多為 `-en` 與非 `-en` 成對存在。

修改建議：
- **新增頁面**時，請同時新增 `ZH/EN` 兩份 `page.tsx`，並在 `src/router/config.tsx` 同步加上兩條路由。
- 盡量保持語系切換連結規則一致（例如中文頁連到對應的 `*-en` 頁，英文頁連回中文頁）。

---

## i18next 現況與使用方式

雖然專案已初始化 i18next（`src/i18n/index.ts`），但目前頁面內容主要是**拆頁實作**。

若要逐步改為「同頁多語系」：
- 可在頁面內引入 `useTranslation()`，把文字抽到 `src/i18n/local/<lang>/*.ts`。
- 注意：目前沒有看到大量 `useTranslation()` 使用點，導入時請避免一次性大重構。

---

## OGL/WebGL（首頁 Prism 動效）注意事項

首頁（中/英）包含 Prism 背景元件（在 `page.tsx` 檔內直接宣告）：
- 會建立 WebGL context、注入 shader、使用 RAF 動畫與 `ResizeObserver`
- 已包含「WebGL 不支援時跳過」的降級路徑

修改建議：
- 盡量避免在此處引入大型第三方 3D/渲染依賴，避免 bundle 變大
- 修改 shader/迴圈步數要注意效能（尤其行動裝置）

---

## 外部依賴與風險點（readdy.ai）

### Contact 表單提交

- 中文：`src/pages/contact/page.tsx`
  - `POST https://readdy.ai/api/form/d6juo8vrgrhbthj8n4o0`
- 英文：`src/pages/contact-en/page.tsx`
  - `POST https://readdy.ai/api/form/d6juo8vrgrhbthj8n4og`

注意事項：
- 表單以 `application/x-www-form-urlencoded` 送出
- 如需更換端點或增加欄位，請同步更新 ZH/EN

### 圖片素材
多頁面使用 `https://readdy.ai/api/search-image?...` 或 `https://static.readdy.ai/image/...`。

注意事項：
- 這些 URL 依賴第三方可用性；若要做離線/自管，需搬移圖片到本專案資產或 CDN

---

## 建置輸出與部署（SPA 重要）

- Vite build 輸出目錄：`out/`（見 `vite.config.ts` 的 `build.outDir`）
- `BrowserRouter` 為 HTML5 history 模式（非 hash router）

部署必做（不然重新整理子路由會 404）：
- 伺服器需設定「**所有非靜態資源路徑**回退到 `index.html`」，讓前端路由接手。

另外：
- `basename={import.meta.env.BASE_URL}`：若部署在子路徑（非 `/`），需正確設定 `BASE_URL`（Vite 的 base 設定/環境變數策略需與實際部署一致）。

---

## 程式風格與修改規範（給協作者/AI）

- **語言**：TypeScript/React Function Components
- **一致性優先**：本專案頁面多為「單檔大頁面」結構；若要抽共用元件，請先抽出**重複出現且穩定**的區塊（例如 header/footer/nav）再逐步整理，避免一次性大改造成風險。
- **路由變更**：任何路徑調整都要同步檢查：
  - 導覽列/頁尾連結（大量使用 `<a href="...">`）
  - 中英語系互跳連結
- **可用性**：保持行動版選單（mobile menu）與桌面版 dropdown 行為一致
- **SEO**：`index.html` 內已有 meta/OG/結構化資料；如需調整標題/描述，注意中英文一致性與 canonical 設定策略

---

## 已知現況（可改進但非必須）

- `src/index.css` 內 Tailwind directives 出現重複（`@tailwind base/components/utilities` 重覆兩次）
- i18n 已初始化但目前頁面多以拆頁方式呈現，存在「雙軌」可能性
- 部分資源與表單依賴第三方 `readdy.ai`

以上項目若要處理，建議以「小步重構」方式逐步改善。

