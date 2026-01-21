@echo off
chcp 65001 >nul
title Star Greenhouse - 本地服务器
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Star Greenhouse: 100%% Survival                 ║
echo ║     启动本地服务器                                   ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM 确保使用本地构建版本
echo 正在构建本地预览版本...
call npm run build:local

echo.
echo ✅ 构建完成！
echo.
echo 正在启动预览服务器...
echo.
echo 📌 服务器地址：http://localhost:4173
echo 📌 浏览器将自动打开
echo.
echo 💡 提示：关闭此窗口即可停止服务器
echo.
timeout /t 2 /nobreak >nul

REM 启动预览服务器
start chrome "http://localhost:4173"
call vite preview --config vite.config.local.js --host localhost --port 4173
