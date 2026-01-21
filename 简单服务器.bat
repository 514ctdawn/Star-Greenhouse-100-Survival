@echo off
chcp 65001 >nul
title 简单 HTTP 服务器
color 0B

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║           简单 HTTP 服务器                           ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM 确保 dist 文件夹存在
if not exist "dist" (
    echo 正在构建项目...
    call npm run build
    echo.
)

echo 正在启动服务器...
echo.
echo 📌 服务器地址：http://localhost:8080
echo 📌 按 Ctrl+C 停止服务器
echo.

REM 尝试使用 Python
python --version >nul 2>&1
if %errorlevel%==0 (
    echo ✅ 使用 Python HTTP 服务器
    echo.
    start "" "http://localhost:8080"
    cd dist
    python -m http.server 8080
    cd ..
    exit
)

REM 尝试使用 Node.js http-server
where http-server >nul 2>&1
if %errorlevel%==0 (
    echo ✅ 使用 http-server
    echo.
    start "" "http://localhost:8080"
    cd dist
    http-server -p 8080
    cd ..
    exit
)

REM 如果都没有，尝试安装 http-server
echo ⚠️  未找到服务器工具
echo.
echo 正在安装 http-server...
call npm install -g http-server
echo.
echo 安装完成，正在启动...
echo.
start "" "http://localhost:8080"
cd dist
http-server -p 8080
cd ..
