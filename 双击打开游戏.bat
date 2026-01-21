@echo off
chcp 65001 >nul
title Star Greenhouse: 100% Survival
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║                                                      ║
echo ║      Star Greenhouse: 100%% Survival                ║
echo ║                                                      ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo 正在在 Google Chrome 浏览器中打开游戏...
echo.

REM 尝试使用 Chrome 打开
set CHROME_PATH=
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe
)

if defined CHROME_PATH (
    echo 找到 Chrome 浏览器
    echo.
    timeout /t 1 /nobreak >nul
    "%CHROME_PATH%" "https://514ctdawn.github.io/Star-Greenhouse-100-Survival/"
    echo.
    echo ✅ 游戏已在 Chrome 浏览器中打开！
) else (
    echo ⚠️  未找到 Chrome 浏览器，使用默认浏览器打开...
    echo.
    timeout /t 1 /nobreak >nul
    start "" "https://514ctdawn.github.io/Star-Greenhouse-100-Survival/"
    echo.
    echo ✅ 游戏已在浏览器中打开！
)

echo.
echo 📌 游戏链接：
echo    https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
echo.
echo 💡 提示：如果浏览器没有自动打开，请复制上面的链接手动访问
echo.
timeout /t 3 /nobreak >nul
