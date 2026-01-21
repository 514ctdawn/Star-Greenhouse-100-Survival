@echo off
chcp 65001 >nul
title Star Greenhouse - 直接打开 HTML
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Star Greenhouse: 100%% Survival                 ║
echo ║     直接打开 HTML 版本                               ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM 检查 dist 文件夹是否存在
if not exist "dist\index.html" (
    echo ⚠️  构建文件不存在，正在构建...
    echo.
    call npm run build
    echo.
)

echo ✅ 构建文件已就绪
echo.
echo 正在启动本地服务器...
echo.
echo 📌 游戏将在浏览器中自动打开
echo 📌 服务器地址：http://localhost:8080
echo.
echo 💡 提示：关闭此窗口即可停止服务器
echo.

REM 检查 Python 是否可用
python --version >nul 2>&1
if %errorlevel%==0 (
    echo 使用 Python 服务器...
    echo.
    start chrome "http://localhost:8080"
    timeout /t 2 /nobreak >nul
    cd dist
    python -m http.server 8080
    cd ..
) else (
    REM 检查 Node.js http-server 是否安装
    where http-server >nul 2>&1
    if %errorlevel%==0 (
        echo 使用 http-server...
        echo.
        start chrome "http://localhost:8080"
        timeout /t 2 /nobreak >nul
        cd dist
        http-server -p 8080 -o
        cd ..
    ) else (
        echo ⚠️  未找到 Python 或 http-server
        echo.
        echo 正在安装 http-server...
        call npm install -g http-server
        echo.
        echo 安装完成，正在启动服务器...
        echo.
        start chrome "http://localhost:8080"
        timeout /t 2 /nobreak >nul
        cd dist
        http-server -p 8080 -o
        cd ..
    )
)
