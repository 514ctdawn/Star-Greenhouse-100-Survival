@echo off
chcp 65001 >nul
title 打开 HTML 文件
color 0E

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     打开 HTML 文件（使用本地服务器）                ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM 首先确保项目已构建
if not exist "dist\index.html" (
    echo ⚠️  构建文件不存在
    echo 正在构建项目...
    echo.
    call npm run build
    echo.
    echo ✅ 构建完成
    echo.
)

echo 选择打开方式：
echo.
echo 1. 使用本地服务器（推荐）- 游戏可以正常运行
echo 2. 直接打开 HTML 文件（会有错误，不推荐）
echo.
set /p choice="请选择 (1 或 2，直接回车默认选择 1): "

if "%choice%"=="2" (
    echo.
    echo ⚠️  警告：直接打开 HTML 文件会有 CORS 错误！
    echo 游戏可能无法正常运行。
    echo.
    echo 正在打开 HTML 文件...
    timeout /t 2 /nobreak >nul
    
    REM 尝试使用 Chrome
    if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
        "C:\Program Files\Google\Chrome\Application\chrome.exe" "%~dp0dist\index.html"
    ) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
        "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "%~dp0dist\index.html"
    ) else (
        REM 使用默认浏览器
        start "" "%~dp0dist\index.html"
    )
    
    echo.
    echo ⚠️  如果看到错误，请使用选项 1（本地服务器）
    echo.
    pause
    exit
)

REM 选项 1：使用本地服务器
echo.
echo ✅ 使用本地服务器方式
echo.
echo 正在启动本地服务器...
echo.

REM 检查并安装 http-server（如果需要）
where http-server >nul 2>&1
if %errorlevel% neq 0 (
    echo 正在安装 http-server...
    call npm install -g http-server
    echo.
)

echo 📌 服务器将在 http://localhost:8080 启动
echo 📌 浏览器将自动打开
echo 📌 按 Ctrl+C 停止服务器
echo.
timeout /t 2 /nobreak >nul

REM 启动服务器并在浏览器中打开
cd dist
start "" "http://localhost:8080"
http-server -p 8080 -o
cd ..
