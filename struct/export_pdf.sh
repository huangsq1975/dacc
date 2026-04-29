#!/usr/bin/env bash
# ============================================================
# export_pdf.sh — 將錢包架構 HTML 矢量圖匯出為單一 PDF
#
# 用法：
#   ./export_pdf.sh              # 輸出 wallet_architecture_deck.pdf
#   ./export_pdf.sh out.pdf      # 自訂輸出檔名
#
# 依賴：google-chrome（headless）、pdfunite（poppler-utils）
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT="${1:-${SCRIPT_DIR}/wallet_architecture_deck.pdf}"
TMPDIR_WORK="$(mktemp -d)"
trap 'rm -rf "$TMPDIR_WORK"' EXIT

# ── 顏色輸出 ──────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'
BOLD='\033[1m'; NC='\033[0m'

log()  { echo -e "${CYAN}[export]${NC} $*"; }
ok()   { echo -e "${GREEN}[✓]${NC} $*"; }
err()  { echo -e "${RED}[✗]${NC} $*" >&2; exit 1; }

# ── 依賴檢查 ─────────────────────────────────────────────
CHROME="$(command -v google-chrome google-chrome-stable chromium-browser chromium 2>/dev/null | head -1)"
[[ -z "$CHROME" ]] && err "找不到 Chrome/Chromium，請先安裝"
command -v pdfunite >/dev/null 2>&1 || err "找不到 pdfunite，請安裝 poppler-utils"

echo -e "${BOLD}========================================${NC}"
echo -e "${BOLD} 錢包架構設計 → PDF 匯出${NC}"
echo -e "${BOLD}========================================${NC}"
log "Chrome : $CHROME ($($CHROME --version 2>/dev/null | head -1))"
log "輸出至 : $OUTPUT"
echo ""

# ── 頁面定義：檔名  SVG寬  SVG高  body水平padding  body垂直padding
# body padding 根據各 HTML 的 padding 設定（px）
declare -a PAGES=(
  "wallet_interaction_architecture.html 1180 720 56 48"
  "wallet_flow_02_deposit.html          1200 760 40 40"
  "wallet_flow_03_withdrawal.html       1200 820 40 40"
  "wallet_flow_04_suspicious.html       1200 700 40 40"
  "wallet_flow_05_gasfee.html           1200 680 40 40"
)

PAGE_PDFS=()

for i in "${!PAGES[@]}"; do
  read -r SRC SVG_W SVG_H PAD_X PAD_Y <<< "${PAGES[$i]}"
  SRC="${SRC// /}"          # trim spaces from filename
  PAGE_NUM=$((i + 1))
  TOTAL=${#PAGES[@]}

  SRC_PATH="${SCRIPT_DIR}/${SRC}"
  [[ ! -f "$SRC_PATH" ]] && err "找不到檔案：$SRC_PATH"

  # 計算紙張尺寸（px）= SVG尺寸 + body padding
  PW=$((SVG_W + PAD_X))
  PH=$((SVG_H + PAD_Y))

  log "渲染第 ${PAGE_NUM}/${TOTAL} 頁：${SRC}  (${PW}×${PH} px)"

  # 建立臨時 HTML：注入 @page 使紙張精確貼合內容，移除 body padding
  TMP_HTML="${TMPDIR_WORK}/page_${PAGE_NUM}.html"
  INJECT="<style>@page{margin:0;size:${PW}px ${PH}px}body{margin:0!important;padding:0!important}</style>"
  sed "s|</head>|${INJECT}</head>|" "$SRC_PATH" > "$TMP_HTML"

  OUT_PDF="${TMPDIR_WORK}/page_${PAGE_NUM}.pdf"

  "$CHROME" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --disable-software-rasterizer \
    --window-size="${PW},${PH}" \
    --force-device-scale-factor=1 \
    --print-to-pdf="$OUT_PDF" \
    --print-to-pdf-no-header \
    "file://${TMP_HTML}" 2>/dev/null

  [[ ! -f "$OUT_PDF" ]] && err "第 ${PAGE_NUM} 頁 PDF 產生失敗"
  ok "第 ${PAGE_NUM}/${TOTAL} 頁完成  ($(du -h "$OUT_PDF" | cut -f1))"
  PAGE_PDFS+=("$OUT_PDF")
done

echo ""
log "合併 ${#PAGE_PDFS[@]} 頁為單一 PDF..."
pdfunite "${PAGE_PDFS[@]}" "$OUTPUT"

[[ ! -f "$OUTPUT" ]] && err "PDF 合併失敗"

SIZE="$(du -h "$OUTPUT" | cut -f1)"
PAGES_COUNT="$(pdfinfo "$OUTPUT" 2>/dev/null | grep '^Pages:' | awk '{print $2}')"

echo ""
echo -e "${BOLD}========================================${NC}"
ok "匯出完成"
echo -e "   檔案：${BOLD}${OUTPUT}${NC}"
echo -e "   大小：${SIZE}"
echo -e "   頁數：${PAGES_COUNT} 頁"
echo -e "${BOLD}========================================${NC}"
