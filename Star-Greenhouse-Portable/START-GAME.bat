@echo off 
chcp 65001 >nul 
title Star Greenhouse: 100% Survival 
color 0A 
 
echo Starting game... 
echo. 
python --version >nul 2>&1 
if %errorlevel% equ 0 ( 
    cd dist 
    start chrome "http://localhost:8000" 
    python -m http.server 8000 
    cd .. 
) else ( 
    echo ERROR: Python not installed! 
    echo Please install Python from https://www.python.org/ 
    pause 
) 
