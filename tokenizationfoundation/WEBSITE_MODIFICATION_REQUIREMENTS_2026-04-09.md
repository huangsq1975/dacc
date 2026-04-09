# 網站修改需求文檔（會議整理）

## 文件資訊

- 日期：2026-04-09
- 來源會議記錄：
  - `src/aw.txt`
  - `system_audio_20260409_090955.txt`
- 目的：彙整目前網站尚需修改項目，供設計與工程執行

## 一、修改原則（全站）

- 參考 https://www.aegiscustody.com/ 網站風格，採用「滿版色塊」切分段落，避免投影片感。
- 建立一致字級系統：`Headline / Subhead / Body` 三層。
- Body 字級建議不超過 16px，且全站統一。
- 區塊間距需一致，避免段落間留白過大。
- 色彩需遵循品牌規範（brand guideline / CMYK 對應色），區塊可採藍 / 白 / 灰交替。

## 二、高優先修改項目（先執行）

### 1) 首頁（Home）

- 更換左上角 Logo 為正確的 Tokenization Foundation 版本。
- 導覽列（Navbar）與第一屏主視覺區塊（Hero）使用不同藍色，Hero 藍色需更淺。
- 移除頁面中所有小黑色 `TF` 浮動標記。
- 收斂第一藍色區塊與下一區塊間距。
- Problem / Solutions / Impact 相關區塊：
  - 移除過重黑底或黑色大元素，改用品牌色底（深灰或藍）。
  - 深色底文字改白字，確保可讀性。
  - 避免「白框套白框」，內容應直接置於單一底色。
  - 移除浮動 `Impact` 小標籤。
- 指定文案與換行修正：
  - `A reimagined model`（第一行）
  - `programmable humanitarian infrastructure`（第二行）
- Impact 指定句改為兩行：
  1. `Over five years, the platform is expected to reach a billion-plus people globally,`
  2. `while scaling transaction volume into hundreds of millions annually.`

### 2) Governing Council 區塊（首頁）

- 區塊背景改為全白，便於 logo 展示。
- 更新錯誤 logo（含 UN 與其他夥伴 logo）為正確素材。
- 文案修正：刪除 `initial`，保留 `two founding governing council members`。
- CTA 文案語氣改正式，例如：
  - `Interested in being on our council? Click this link.`

### 3) Footer（全站）

- Footer 需出現在每個頁面底部（全站一致）。
- LinkedIn icon 使用透明背景版本（不可為白底方框）。
- 法務/法律文案靠左排列。
- `Capital that responds` 放回指定位置，不可上浮。
- Footer 區塊視覺需滿版對齊。

## 三、中優先修改項目

### 1) Approach 頁

- 主標改為兩行：
  - `Reimagining a fully tokenized ecosystem`
  - `for humanitarian capital`
- 圖表背景條需延伸至頁面兩側，整體視覺需「網站化」而非「PPT 貼圖感」。
- 段落間加入分隔條。
- 白皮書入口做成清楚可點擊按鈕。
- SDR / dSDR 說明區目前資訊密度過高：
  - 需精簡文案，避免研究報告式長文。
  - 建議改為更直白敘述與條列（bullets）。
- Token loop/圓形圖現況問題：
  - 尺寸過大、脈絡不足、與上下文斷裂。
  - 先保留版位作為 placeholder，後續補內容與重設版型。

### 2) Team 頁

- 每位成員簡介縮為 1-2 句。
- 每張卡片放 LinkedIn 連結（建議水平版 icon）。
- `Meet the team` 樣式簡化，從矩形框中移出。

### 3) Contact 頁

- 三分類（Contact / Join Council / Join Waitlist）方向正確，可保留。
- 欄位策略維持：
  - Job title 非必填
  - Phone number 非必填
  - 保留國碼與公司名稱欄位
- 文案可維持 `Join the waitlist`（簡潔優先）。
- 移除頁面頂部重複標題文案（如 `Get in touch / Contact / Reach out to our team` 重複顯示）。

## 四、待確認決策（產品/品牌）

- Approach 頁內容策略：先教育概念（What is SDR）或先講價值主張。
- Token loop 圖是否保留圓形結構，或改為左右敘事版面（文案 + 圖像）。
- LinkedIn 是否同時放於 Navbar 與 Footer。

## 五、建議執行順序

1. 全站設計系統統一（字級、色塊、間距、滿版規則）
2. 首頁高優先視覺與文案修正
3. Footer 全站一致化
4. Approach 頁結構與內容精簡
5. Team / Contact 細節優化
6. 最後做一次全站 QA（文案、斷行、對齊、可讀性、連結）

## 六、驗收清單（簡版）

- [ ] 全站字級系統一致（Headline/Subhead/Body）
- [ ] 色塊滿版且區塊節奏一致（藍/白/灰）
- [ ] 首頁 Logo、TF 浮標、Problem/Solution/Impact 修正完成
- [ ] Governing Council logo 與文案修正完成
- [ ] Footer 全站一致且 LinkedIn 為透明底 icon
- [ ] Approach 主要段落、按鈕、圖表視覺修正完成
- [ ] Team 簡介精簡、LinkedIn 連結完成
- [ ] Contact 頂部重複文案移除
