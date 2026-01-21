@echo off
chcp 65001 >nul
title Create Portable Version
color 0A

echo.
echo ========================================
echo Create Portable Version
echo ========================================
echo.

set PORTABLE_DIR=Star-Greenhouse-Portable
if exist "%PORTABLE_DIR%" rmdir /s /q "%PORTABLE_DIR%"

echo Creating portable folder...
mkdir "%PORTABLE_DIR%"
mkdir "%PORTABLE_DIR%\dist"

echo.
echo [1/3] Building project...
call npm run build:local
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Copying files...
xcopy /E /I /Y dist "%PORTABLE_DIR%\dist" >nul

echo.
echo [3/3] Creating startup script...
echo @echo off > "%PORTABLE_DIR%\START-GAME.bat"
echo chcp 65001 ^>nul >> "%PORTABLE_DIR%\START-GAME.bat"
echo title Star Greenhouse: 100%% Survival >> "%PORTABLE_DIR%\START-GAME.bat"
echo color 0A >> "%PORTABLE_DIR%\START-GAME.bat"
echo. >> "%PORTABLE_DIR%\START-GAME.bat"
echo echo Starting game... >> "%PORTABLE_DIR%\START-GAME.bat"
echo echo. >> "%PORTABLE_DIR%\START-GAME.bat"
echo python --version ^>nul 2^>^&1 >> "%PORTABLE_DIR%\START-GAME.bat"
echo if %%errorlevel%% equ 0 ^( >> "%PORTABLE_DIR%\START-GAME.bat"
echo     cd dist >> "%PORTABLE_DIR%\START-GAME.bat"
echo     start chrome "http://localhost:8000" >> "%PORTABLE_DIR%\START-GAME.bat"
echo     python -m http.server 8000 >> "%PORTABLE_DIR%\START-GAME.bat"
echo     cd .. >> "%PORTABLE_DIR%\START-GAME.bat"
echo ^) else ^( >> "%PORTABLE_DIR%\START-GAME.bat"
echo     echo ERROR: Python not installed! >> "%PORTABLE_DIR%\START-GAME.bat"
echo     echo Please install Python from https://www.python.org/ >> "%PORTABLE_DIR%\START-GAME.bat"
echo     pause >> "%PORTABLE_DIR%\START-GAME.bat"
echo ^) >> "%PORTABLE_DIR%\START-GAME.bat"

echo ======================================== > "%PORTABLE_DIR%\README.txt"
echo Star Greenhouse: 100%% Survival >> "%PORTABLE_DIR%\README.txt"
echo Portable Version >> "%PORTABLE_DIR%\README.txt"
echo ======================================== >> "%PORTABLE_DIR%\README.txt"
echo. >> "%PORTABLE_DIR%\README.txt"
echo How to run: >> "%PORTABLE_DIR%\README.txt"
echo. >> "%PORTABLE_DIR%\README.txt"
echo 1. Double-click "START-GAME.bat" >> "%PORTABLE_DIR%\README.txt"
echo    - Requires Python installed >> "%PORTABLE_DIR%\README.txt"
echo    - Game will open in browser >> "%PORTABLE_DIR%\README.txt"
echo. >> "%PORTABLE_DIR%\README.txt"
echo 2. Manual: >> "%PORTABLE_DIR%\README.txt"
echo    - Open command prompt >> "%PORTABLE_DIR%\README.txt"
echo    - Go to dist folder >> "%PORTABLE_DIR%\README.txt"
echo    - Run: python -m http.server 8000 >> "%PORTABLE_DIR%\README.txt"
echo    - Visit: http://localhost:8000 >> "%PORTABLE_DIR%\README.txt"

echo.
echo OK: Portable version created!
echo.
echo Folder: %PORTABLE_DIR%
echo.
echo Now you can:
echo  1. Zip the %PORTABLE_DIR% folder
echo  2. Send to others
echo  3. They extract and double-click "START-GAME.bat"
echo.
pause
