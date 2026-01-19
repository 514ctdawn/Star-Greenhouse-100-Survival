@echo off
echo ========================================
echo Star Greenhouse: 100%% Survival
echo ========================================
echo.
echo Starting simple HTTP server...
echo.
echo The game will be available at: http://localhost:8000
echo.
echo Opening in Chrome...
timeout /t 2 /nobreak >nul
start chrome "http://localhost:8000"
echo.
echo Server is running. Press Ctrl+C to stop.
echo.
cd dist
python -m http.server 8000
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python not found. Trying alternative method...
    echo Please use start-game.bat instead, or install Python.
    echo.
    pause
)

