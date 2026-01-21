@echo off
REM 这个文件会在双击 index.html 时自动打开网站
REM 由于直接打开 HTML 文件会有 CORS 错误，所以自动重定向到在线版本

chcp 65001 >nul
echo ========================================
echo Star Greenhouse: 100%% Survival
echo ========================================
echo.
echo 注意：直接打开 index.html 文件会有错误！
echo.
echo 正在在 Chrome 浏览器中打开在线版本...
echo.
timeout /t 2 /nobreak >nul

REM 尝试使用 Chrome，如果不存在则使用默认浏览器
where chrome >nul 2>&1
if %errorlevel%==0 (
    start chrome "https://514ctdawn.github.io/Star-Greenhouse-100-Survival/"
) else (
    start "https://514ctdawn.github.io/Star-Greenhouse-100-Survival/"
)

echo.
echo 网站已在浏览器中打开！
echo.
echo 如果浏览器没有自动打开，请手动访问：
echo https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
echo.
pause
