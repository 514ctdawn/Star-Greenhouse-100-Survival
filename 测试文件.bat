@echo off
chcp 65001 >nul
title 测试文件是否存在
color 0B

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║           测试文件是否存在                          ║
echo ╚══════════════════════════════════════════════════════╝
echo.

echo 检查 dist 文件夹...
if exist "dist\index.html" (
    echo ✅ dist\index.html 存在
) else (
    echo ❌ dist\index.html 不存在！
)

if exist "dist\assets\index-Cdb7LujM.js" (
    echo ✅ dist\assets\index-Cdb7LujM.js 存在
) else (
    echo ❌ dist\assets\index-Cdb7LujM.js 不存在！
)

if exist "dist\assets\index-BZ9h87A7.css" (
    echo ✅ dist\assets\index-BZ9h87A7.css 存在
) else (
    echo ❌ dist\assets\index-BZ9h87A7.css 不存在！
)

echo.
echo 检查 index.html 内容...
findstr "/assets/" dist\index.html >nul
if %errorlevel%==0 (
    echo ✅ index.html 中的路径正确（/assets/...）
) else (
    echo ❌ index.html 中的路径可能不正确
)

echo.
echo 显示 index.html 中的资源路径：
findstr "src=\|href=" dist\index.html

echo.
pause
