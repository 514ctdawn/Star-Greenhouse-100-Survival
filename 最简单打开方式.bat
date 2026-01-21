@echo off
chcp 65001 >nul
title Star Greenhouse - 最简单方式
color 0A

echo.
echo ========================================
echo Star Greenhouse: 100%% Survival
echo 最简单打开方式
echo ========================================
echo.
echo 使用开发服务器（最简单，不会有路径问题）
echo.
echo 正在启动开发服务器...
echo.
echo 游戏将在 http://localhost:5173 打开
echo 按 Ctrl+C 停止服务器
echo.
timeout /t 2 /nobreak >nul

start chrome "http://localhost:5173"
call npm run dev
