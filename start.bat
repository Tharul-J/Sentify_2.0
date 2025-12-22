@echo off
echo ========================================
echo    Starting Sentify Application
echo ========================================
echo.

echo Starting Backend Server...
start "Sentify Backend" cmd /k "cd backend && venv\Scripts\python.exe app.py"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Sentify Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
pause
