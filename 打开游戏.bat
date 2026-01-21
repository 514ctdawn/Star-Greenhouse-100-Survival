@echo off
chcp 65001 >nul
echo ========================================
echo Star Greenhouse: 100%% Survival
echo ========================================
echo.
echo 正在启动游戏...
echo.
echo 选择打开方式：
echo 1. 在线版本（GitHub Pages）- 推荐
echo 2. 本地开发服务器（需要先运行 npm run dev）
echo.
set /p choice="请选择 (1 或 2，直接回车默认选择 1): "

if "%choice%"=="2" (
    echo.
    echo 正在启动本地开发服务器...
    echo 游戏将在 http://localhost:5173 打开
    echo.
    echo 提示：如果服务器已经在运行，请直接访问 http://localhost:5173
    echo.
    timeout /t 2 /nobreak >nul
    start chrome "http://localhost:5173"
    call npm run dev
) else (
    echo.
    echo 正在打开在线版本...
    echo.
    timeout /t 2 /nobreak >nul
    start chrome "https://514ctdawn.github.io/Star-Greenhouse-100-Survival/"
    echo.
    echo 网站已在 Chrome 浏览器中打开！
    echo.
    pause
)
