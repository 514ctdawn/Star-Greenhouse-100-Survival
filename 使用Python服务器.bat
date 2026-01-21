@echo off
chcp 65001 >nul
title Star Greenhouse - Python 服务器
color 0B

echo.
echo ========================================
echo Star Greenhouse: 100%% Survival
echo 使用 Python HTTP 服务器
echo ========================================
echo.

REM 确保已构建
if not exist "dist\index.html" (
    echo 正在构建项目...
    call npm run build:local
    echo.
)

echo 检查 Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python 未安装！
    echo 请安装 Python 或使用其他方式
    pause
    exit /b 1
)

echo Python 已安装
echo.
echo 正在启动 Python HTTP 服务器...
echo.
echo 服务器地址：http://localhost:8000
echo 浏览器将自动打开
echo.
echo 按 Ctrl+C 停止服务器
echo.
timeout /t 2 /nobreak >nul

cd dist
start chrome "http://localhost:8000"
python -m http.server 8000
cd ..
