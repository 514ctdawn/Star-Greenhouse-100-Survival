@echo off
chcp 65001 >nul
title Star Greenhouse - Node 服务器
color 0C

echo.
echo ========================================
echo Star Greenhouse: 100%% Survival
echo 使用 http-server
echo ========================================
echo.

REM 确保已构建
if not exist "dist\index.html" (
    echo 正在构建项目...
    call npm run build:local
    echo.
)

echo 检查 http-server...
where http-server >nul 2>&1
if %errorlevel% neq 0 (
    echo 正在安装 http-server...
    call npm install -g http-server
    echo.
)

echo http-server 已就绪
echo.
echo 正在启动服务器...
echo.
echo 服务器地址：http://localhost:8080
echo 浏览器将自动打开
echo.
echo 按 Ctrl+C 停止服务器
echo.
timeout /t 2 /nobreak >nul

cd dist
start chrome "http://localhost:8080"
http-server -p 8080 -o
cd ..
