# 全站字級與字型調整說明（2026-04-09）

## 目標

統一 **標題（H1–H3）**、**內文** 與 **次級／標籤（subject、表單標籤、區塊標籤）**，避免同一區塊內混用多種無襯線字級：

| 層級 | 規則 | 實作 |
|------|------|------|
| 標題 | 僅用 Playfair 展示層級 | `.tf-h1`、`.tf-h2`、`.tf-h3`、`.tf-h3-italic`（`clamp`） |
| 內文 | **不大於 16 px**，全站一致 | `body` 與 `text-base`：`1rem`（16 px） |
| 次級／標籤 | 比正文小一級、全站一致 | `text-sm`（14 px）：徽章、表單標籤、頁尾輔助、夥伴名稱等 |

**`.tf-subhead`**：與內文同字級（16 px）、Inter、字重 600，用於 H1 下的短標語，**不再**使用 H3 字級，避免 hero 區出現「標題 + 準標題 + 內文」三種無襯線尺吋。

## 技術實作

### 1. `src/index.css`

- **`body`**：`font-size: 1rem`（16 px）、`line-height: 1.65`（全寬斷點不再放大內文）。
- **CSS 變數**：`--tf-h1`、`--tf-h2`、`--tf-h3`（皆為 `clamp`）。
- **工具類**：
  - `.tf-h1`、`.tf-h2`、`.tf-h3`：**Playfair Display**、字重 700。
  - `.tf-h3-italic`：H3 級、斜體（Approach 頁小節標題）。
  - `.tf-subhead`：**Inter**、字重 600、**16 px**（與內文同尺、僅字重不同）。

### 2. `tailwind.config.ts`

- 覆寫 **`text-base`** 為 `1rem` 與行高 `1.65`，與 `body` 一致。

## 各頁面修改摘要

| 檔案 | 變更 |
|------|------|
| `src/pages/home/page.tsx` | Hero `h1`、區塊 `h2`、Join `h2`、頁尾標語等改為 `.tf-*`；`.tf-subhead` 為 16 px 粗體；Impact 結語改為內文級 `font-semibold`（非 H3 字級）；Council 夥伴字與頁尾免責與 `text-sm` 對齊。 |
| `src/pages/approach/page.tsx` | 頁頂主標（語意 `h1`）視覺用 `.tf-h2`（區塊較窄）；流程圖與標籤區塊改 `.tf-h3`；各節 `h2`／`h3` 改對應工具類；長段落改繼承內文；白皮書按鈕改為內文級 Inter、semibold。 |
| `src/pages/contact/page.tsx` | Hero `h1`、左欄 `h2`、表單區 `h3` 改 `.tf-*`；副文改繼承內文。 |
| `src/pages/team/page.tsx` | `h1` 改 `.tf-h1`；成員簡介改繼承內文；底部 CTA 改 `.tf-subhead`。 |
| `src/pages/NotFound.tsx` | `h1` 改 `.tf-h1`；說明文字繼承內文。 |

## 字型分工

- **標題（`.tf-h1` / `.tf-h2` / `.tf-h3`）**：Playfair Display（與 `index.html` 已載入字型一致）。
- **內文與 UI 主要說明**：Inter（含繼承 `body` 的段落與清單）。
- **次級／輔助**：**SectionBadge**、表單標籤、按鈕字、頁尾版權與免責、Contact／Approach 頁尾等一律 **`text-sm`**（14 px），與內文 16 px 形成固定兩級無襯線尺吋。
- **導航列**：品牌字與連結為 **`text-base`**（16 px），行動版選單連結與桌面一致，不再使用 `lg:text-lg`。

## 備註

- Approach 頁頂主標因置於白色窄版區塊內，**語意仍為單頁唯一 `h1`**，**視覺字級採 H2 刻度**（`.tf-h2`），避免擠版。
- 首頁頁尾「Capital That Responds」改為與 H1 相同刻度（`.tf-h1`），與全站主視覺標語一致。
