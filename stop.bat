@echo off
echo ========================================
echo    Stopping Sentify Servers
echo ========================================
echo.

echo Stopping Backend Server (port 5000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Backend stopped (PID: %%a)
)

echo Stopping Frontend Server (port 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Frontend stopped (PID: %%a)
)

echo.
echo ========================================
echo All servers stopped!
echo ========================================
echo.
pause
