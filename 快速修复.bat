@echo off
chcp 65001 >nul
title 快速修复 404 错误
color 0C

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║         修复 main.jsx 404 错误                       ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo 问题：GitHub Pages 可能配置错误，正在加载开发版本
echo.
echo ═══════════════════════════════════════════════════════
echo 步骤 1：检查 GitHub Pages 设置
echo ═══════════════════════════════════════════════════════
echo.
echo 正在打开 GitHub Pages 设置页面...
echo.
timeout /t 2 /nobreak >nul
start chrome "https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages"
echo.
echo ✅ 请检查以下设置：
echo.
echo    Source: Deploy from a branch
echo    Branch: gh-pages  ← 必须是这个！
echo    Folder: / (root)
echo.
echo    如果不是，请修改并保存
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════
echo 步骤 2：重新部署
echo ═══════════════════════════════════════════════════════
echo.
set /p redeploy="是否重新部署？(Y/N): "
if /i "%redeploy%"=="Y" (
    echo.
    echo 正在重新部署...
    call npm run deploy
    echo.
    echo ✅ 部署完成！请等待 1-5 分钟让 GitHub Pages 更新
) else (
    echo 跳过重新部署
)

echo.
echo ═══════════════════════════════════════════════════════
echo 步骤 3：清除浏览器缓存
echo ═══════════════════════════════════════════════════════
echo.
echo 请手动执行以下操作：
echo.
echo 1. 按 Ctrl + Shift + Delete 打开清除数据对话框
echo 2. 选择"缓存的图片和文件"
echo 3. 点击"清除数据"
echo.
echo 或者：
echo 1. 按 Ctrl + Shift + N 打开无痕窗口
echo 2. 访问：https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════
echo 验证修复
echo ═══════════════════════════════════════════════════════
echo.
echo 在浏览器中访问以下链接，检查是否返回 404：
echo.
echo JavaScript 文件：
echo https://514ctdawn.github.io/Star-Greenhouse-100-Survival/assets/index-Cdb7LujM.js
echo.
echo 如果这个链接可以访问，说明部署正确！
echo.
pause
