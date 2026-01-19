@echo off
echo ========================================
echo Star Greenhouse: 100%% Survival
echo ========================================
echo.
echo Checking if http-server is installed...
where npx >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js/npx not found. Please install Node.js first.
    pause
    exit /b 1
)
echo.
echo Starting HTTP server...
echo.
echo The game will be available at: http://localhost:8000
echo.
echo Opening in Chrome...
timeout /t 3 /nobreak >nul
start chrome "http://localhost:8000"
echo.
echo Server is running. Press Ctrl+C to stop.
echo.
cd dist
npx http-server -p 8000 -c-1

