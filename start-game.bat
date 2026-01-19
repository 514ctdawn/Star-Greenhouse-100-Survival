@echo off
echo ========================================
echo Star Greenhouse: 100%% Survival
echo ========================================
echo.
echo Starting development server...
echo.
echo The game will open at http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
timeout /t 2 /nobreak >nul
start chrome "http://localhost:5173"
call npm run dev

