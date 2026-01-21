@echo off
chcp 65001 >nul
title Star Greenhouse - 无错误版本
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Star Greenhouse: 100%% Survival                 ║
echo ║     无错误版本 - 确保所有文件正确加载              ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM 步骤 1：确保使用本地构建
echo [1/3] 正在构建本地预览版本...
call npm run build:local
if %errorlevel% neq 0 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)
echo ✅ 构建完成
echo.

REM 步骤 2：验证文件存在
echo [2/3] 验证文件...
if not exist "dist\index.html" (
    echo ❌ index.html 不存在！
    pause
    exit /b 1
)
if not exist "dist\assets\index-Cdb7LujM.js" (
    echo ❌ JavaScript 文件不存在！
    pause
    exit /b 1
)
if not exist "dist\assets\index-BZ9h87A7.css" (
    echo ❌ CSS 文件不存在！
    pause
    exit /b 1
)
echo ✅ 所有文件存在
echo.

REM 步骤 3：启动服务器
echo [3/3] 正在启动预览服务器...
echo.
echo 📌 服务器地址：http://localhost:4173
echo 📌 浏览器将自动打开
echo.
echo 💡 提示：
echo    - 如果看到 404 错误，请关闭浏览器并重新运行此脚本
echo    - 关闭此窗口即可停止服务器
echo.
timeout /t 3 /nobreak >nul

REM 启动预览服务器
start chrome "http://localhost:4173"
call vite preview --config vite.config.local.js --host localhost --port 4173
