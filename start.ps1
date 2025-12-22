# Sentify - Start All Servers
# This script starts both the backend and frontend servers

Write-Host "🚀 Starting Sentify Application..." -ForegroundColor Cyan
Write-Host ""

# Start Backend in new window
Write-Host "📊 Starting Backend Server (Flask)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; .\venv\Scripts\python.exe app.py"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "⚛️  Starting Frontend Server (Vite)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
