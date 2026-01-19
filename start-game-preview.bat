@echo off
echo ========================================
echo Star Greenhouse: 100%% Survival
echo ========================================
echo.
echo Building project...
call npm run build
echo.
if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please check the error messages above.
    pause
    exit /b %ERRORLEVEL%
)
echo.
echo Starting preview server...
echo.
echo The game will open at http://localhost:4173
echo Press Ctrl+C to stop the server
echo.
timeout /t 2 /nobreak >nul
start chrome "http://localhost:4173"
call npm run preview

