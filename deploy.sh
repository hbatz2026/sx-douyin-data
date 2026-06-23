#!/bin/bash
# ============================================
# 抖本内容工坊 · 标准化上线脚本
# 用法: bash deploy.sh [版本描述]
# ============================================
set -e

DEV_DIR="/d/Temp/WorkBuddy/douyin-content-lab"
REPO_DIR="/d/Temp/WorkBuddy/douyin-cloud-auto"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "============================================"
echo "  抖本内容工坊 · 上线检查清单"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================"

# ===== STEP 1: Check source files exist =====
echo ""
echo -e "${YELLOW}[1/6] 检查源文件...${NC}"
FILES=("index.html" "app.js" "styles.css")
for f in "${FILES[@]}"; do
  if [ ! -f "$DEV_DIR/$f" ]; then
    echo -e "${RED}✗ 缺失: $DEV_DIR/$f${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ $f 存在${NC}"
done

# ===== STEP 2: Check encoding =====
echo ""
echo -e "${YELLOW}[2/6] 检查文件编码...${NC}"
for f in "${FILES[@]}"; do
  # Check for BOM (不推荐)
  if [ "$(head -c 3 "$DEV_DIR/$f" | od -A n -t x1 | tr -d ' ')" = "efbbbf" ]; then
    echo -e "${YELLOW}⚠ $f 包含 UTF-8 BOM (将自动移除)${NC}"
  fi
  # Check for GBK (dangerous)
  if iconv -f gbk -t utf-8 "$DEV_DIR/$f" > /dev/null 2>&1; then
    # File is valid GBK — check if it contains GBK-specific byte sequences
    GBK_CHARS=$(grep -oP '[\x80-\xff]{2}' "$DEV_DIR/$f" 2>/dev/null | wc -l)
    if [ "$GBK_CHARS" -gt 5 ]; then
      echo -e "${RED}✗ $f 疑似 GBK 编码! 请用 UTF-8 重新保存${NC}"
      exit 1
    fi
  fi
  # Verify Chinese characters decode correctly as UTF-8
  if grep -q '山西电信' "$DEV_DIR/$f" 2>/dev/null || grep -q '抖本' "$DEV_DIR/$f" 2>/dev/null; then
    echo -e "${GREEN}✓ $f UTF-8 中文验证通过${NC}"
  else
    echo -e "${GREEN}✓ $f 编码正常 (英文/ASCII)${NC}"
  fi
done

# ===== STEP 3: Syntax check =====
echo ""
echo -e "${YELLOW}[3/6] 语法检查...${NC}"
# JavaScript syntax check (basic)
# IMPORTANT: Use node via absolute path (git bash path issues)
if node -c "D:/Temp/WorkBuddy/douyin-content-lab/app.js" 2>/dev/null; then
  echo -e "${GREEN}✓ app.js 语法正确${NC}"
else
  echo -e "${RED}✗ app.js 语法错误!${NC}"
  exit 1
fi
# HTML basic check
if grep -q '</html>' "$DEV_DIR/index.html"; then
  echo -e "${GREEN}✓ index.html 结构完整${NC}"
else
  echo -e "${RED}✗ index.html 可能不完整!${NC}"
  exit 1
fi
# CSS brace check
OPEN=$(grep -o '{' "$DEV_DIR/styles.css" | wc -l)
CLOSE=$(grep -o '}' "$DEV_DIR/styles.css" | wc -l)
if [ "$OPEN" -eq "$CLOSE" ]; then
  echo -e "${GREEN}✓ styles.css 括号匹配 ($OPEN 对)${NC}"
else
  echo -e "${RED}✗ styles.css 括号不匹配! ({${OPEN} vs }${CLOSE})${NC}"
  exit 1
fi

# ===== STEP 4: Auto-increment version =====
echo ""
echo -e "${YELLOW}[4/6] 版本号递增...${NC}"
# Read current version from index.html
CURRENT=$(grep -oP 'v=\d+\.\d+\.\d+' "$REPO_DIR/index.html" | head -1 | cut -d= -f2)
if [ -z "$CURRENT" ]; then
  CURRENT="2.0.1"
fi
echo "  当前版本: $CURRENT"
# Bump patch version
MAJOR=$(echo $CURRENT | cut -d. -f1)
MINOR=$(echo $CURRENT | cut -d. -f2)
PATCH=$(echo $CURRENT | cut -d. -f3)
NEW="$MAJOR.$MINOR.$((PATCH + 1))"
echo -e "  新版本: ${GREEN}$NEW${NC}"

# ===== STEP 5: Copy files (UTF-8 safe, no PowerShell) =====
echo ""
echo -e "${YELLOW}[5/6] 复制文件到仓库...${NC}"
for f in "${FILES[@]}"; do
  # Use cp (preserves encoding), then remove BOM if present
  cp "$DEV_DIR/$f" "$REPO_DIR/$f"
  # Ensure no BOM
  if [ "$(head -c 3 "$REPO_DIR/$f" | od -A n -t x1 | tr -d ' ')" = "efbbbf" ]; then
    sed -i '1s/^\xEF\xBB\xBF//' "$REPO_DIR/$f"
    echo "  $f: BOM 已移除"
  fi
  echo -e "${GREEN}✓ $f 已复制${NC}"
done

# Update cache-busting version
for f in "${FILES[@]}"; do
  sed -i "s/?v=${CURRENT}/?v=${NEW}/g" "$REPO_DIR/$f"
  sed -i "s/\"v=${CURRENT}/\"v=${NEW}/g" "$REPO_DIR/$f"
done
echo -e "${GREEN}✓ 缓存版本: $CURRENT → $NEW${NC}"

# ===== STEP 6: Git commit & push =====
echo ""
echo -e "${YELLOW}[6/6] 提交并推送...${NC}"
cd "$REPO_DIR"

# Only commit changed files (not data/)
git add index.html app.js styles.css

# Build commit message
MSG="v${NEW}"
if [ -n "$1" ]; then
  MSG="$MSG — $1"
else
  MSG="$MSG — auto deployment $(date '+%m/%d %H:%M')"
fi

git commit -m "$MSG"
git push origin master

echo ""
echo "============================================"
echo -e "  ${GREEN}✓ 上线完成!${NC}"
echo "  版本: $NEW"
echo "  站点: https://sxdouyingongfang-mogaubq3.zh-cn.edgeone.cool"
echo "  CDN需等待 2-3 分钟刷新"
echo "============================================"
