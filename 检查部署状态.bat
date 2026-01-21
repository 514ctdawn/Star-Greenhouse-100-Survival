@echo off
chcp 65001 >nul
title 检查 GitHub Pages 部署状态
color 0B

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║    检查 GitHub Pages 部署状态                        ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo 正在检查部署的文件...
echo.

REM 检查本地 dist 文件夹
if exist "dist\index.html" (
    echo ✅ 本地构建文件存在
) else (
    echo ❌ 本地构建文件不存在，需要先运行: npm run build
    echo.
    pause
    exit /b 1
)

echo.
echo 检查 gh-pages 分支...
git fetch origin gh-pages >nul 2>&1
if %errorlevel%==0 (
    echo ✅ gh-pages 分支已更新
) else (
    echo ⚠️  无法获取 gh-pages 分支信息
)

echo.
echo ═══════════════════════════════════════════════════════
echo 部署的文件列表：
echo ═══════════════════════════════════════════════════════
git ls-tree -r origin/gh-pages --name-only 2>nul
echo.

echo ═══════════════════════════════════════════════════════
echo 测试链接：
echo ═══════════════════════════════════════════════════════
echo.
echo 主页面：
echo https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
echo.
echo JavaScript 文件：
echo https://514ctdawn.github.io/Star-Greenhouse-100-Survival/assets/index-Cdb7LujM.js
echo.
echo CSS 文件：
echo https://514ctdawn.github.io/Star-Greenhouse-100-Survival/assets/index-BZ9h87A7.css
echo.
echo 图标文件：
echo https://514ctdawn.github.io/Star-Greenhouse-100-Survival/vite.svg
echo.

echo ═══════════════════════════════════════════════════════
echo 故障排除建议：
echo ═══════════════════════════════════════════════════════
echo.
echo 1. 清除浏览器缓存：
echo    - 按 Ctrl + Shift + Delete
echo    - 或使用无痕模式（Ctrl + Shift + N）
echo.
echo 2. 等待几分钟：
echo    - GitHub Pages 更新可能需要 1-5 分钟
echo.
echo 3. 检查 GitHub 仓库设置：
echo    - 前往 https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages
echo    - 确认 Source 设置为 "gh-pages" 分支
echo.
echo 4. 重新部署：
echo    - 运行: npm run deploy
echo.

pause
