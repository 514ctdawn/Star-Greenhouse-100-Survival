@echo off
chcp 65001 >nul
title Star Greenhouse - No Errors Version
color 0A

echo.
echo ========================================
echo Star Greenhouse: 100%% Survival
echo No Errors Version
echo ========================================
echo.

REM Step 1: Build local version
echo [1/3] Building local preview version...
call npm run build:local
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo OK: Build complete
echo.

REM Step 2: Verify files exist
echo [2/3] Verifying files...
if not exist "dist\index.html" (
    echo ERROR: index.html not found!
    pause
    exit /b 1
)
if not exist "dist\assets\index-Cdb7LujM.js" (
    echo ERROR: JavaScript file not found!
    pause
    exit /b 1
)
if not exist "dist\assets\index-BZ9h87A7.css" (
    echo ERROR: CSS file not found!
    pause
    exit /b 1
)
echo OK: All files exist
echo.

REM Step 3: Start server
echo [3/3] Starting preview server...
echo.
echo Server: http://localhost:4173
echo Browser will open automatically
echo.
echo Tip: Close this window to stop the server
echo.
timeout /t 3 /nobreak >nul

REM Start preview server
start chrome "http://localhost:4173"
call vite preview --config vite.config.local.js --host localhost --port 4173
