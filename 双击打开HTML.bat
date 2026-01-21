@echo off
REM 这是最简单的打开方式 - 双击即可运行
chcp 65001 >nul
title Star Greenhouse - 快速启动
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Star Greenhouse: 100%% Survival                 ║
echo ║     双击打开 HTML 版本                               ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM 确保项目已构建
if not exist "dist\index.html" (
    echo 正在构建项目（首次运行需要一些时间）...
    call npm run build
    echo.
)

echo ✅ 准备就绪！
echo.
echo 正在启动本地服务器并在浏览器中打开...
echo.
echo 📌 游戏地址：http://localhost:4173
echo 💡 关闭此窗口即可停止服务器
echo.

REM 使用本地预览版本（修复路径问题）
call npm run build:local
echo.
echo ✅ 构建完成，正在启动服务器...
echo.
timeout /t 1 /nobreak >nul
start chrome "http://localhost:4173"
call vite preview --config vite.config.local.js
