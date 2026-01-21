@echo off
chcp 65001 >nul
title Star Greenhouse - 本地预览
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Star Greenhouse: 100%% Survival                  ║
echo ║     本地预览版本（无路径问题）                       ║
echo ╚══════════════════════════════════════════════════════╝
echo.

echo 正在构建本地预览版本...
echo.
call npm run build:local

echo.
echo ✅ 构建完成！
echo.
echo 正在启动预览服务器...
echo.
echo 📌 游戏将在浏览器中自动打开
echo 📌 服务器地址：http://localhost:4173
echo.
echo 💡 提示：关闭此窗口即可停止服务器
echo.
timeout /t 2 /nobreak >nul

start chrome "http://localhost:4173"
call vite preview --config vite.config.local.js
