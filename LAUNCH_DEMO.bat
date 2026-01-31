@echo off
title FOSSEE Equipment Monitoring System - Demo Launcher
color 0A
echo.
echo ========================================
echo   FOSSEE Equipment Monitoring System
echo         Demo Launcher v1.0
echo ========================================
echo.
echo This script will launch all components for your demo recording
echo.
echo [1] Launch Backend Server
echo [2] Launch Web Frontend  
echo [3] Launch Desktop Application
echo [4] Launch All Components
echo [5] Exit
echo.
set /p choice="Select option (1-5): "

if "%choice%"=="1" goto backend
if "%choice%"=="2" goto web
if "%choice%"=="3" goto desktop
if "%choice%"=="4" goto all
if "%choice%"=="5" goto exit

:backend
echo.
echo Starting Django Backend Server...
cd /d "%~dp0backend"
start "Backend Server" cmd /k "python manage.py runserver"
echo Backend server started at http://127.0.0.1:8000
pause
goto menu

:web
echo.
echo Starting React Web Frontend...
cd /d "%~dp0web"
start "Web Frontend" cmd /k "npm start"
echo Web frontend starting at http://localhost:3000
pause
goto menu

:desktop
echo.
echo Starting Desktop Application...
cd /d "%~dp0desktop"
start "Desktop App" python app_final_working.py
echo Desktop application launched
pause
goto menu

:all
echo.
echo Launching all components for demo...
echo.

echo [1/3] Starting Backend Server...
cd /d "%~dp0backend"
start "Backend Server" cmd /k "python manage.py runserver"
timeout /t 3 >nul

echo [2/3] Starting Web Frontend...
cd /d "%~dp0web"
start "Web Frontend" cmd /k "npm start"
timeout /t 5 >nul

echo [3/3] Starting Desktop Application...
cd /d "%~dp0desktop"
start "Desktop App" python app_final_working.py
timeout /t 2 >nul

echo.
echo ========================================
echo     All components launched successfully!
echo ========================================
echo.
echo Backend: http://127.0.0.1:8000
echo Web App: http://localhost:3000
echo Desktop: Running in separate window
echo.
echo Ready for demo recording!
echo Press any key to exit...
pause >nul
goto exit

:menu
cls
goto :eof

:exit
echo.
echo Demo launcher closed. Good luck with your recording!
timeout /t 2 >nul
exit
