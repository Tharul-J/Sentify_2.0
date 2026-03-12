# Sentify - Stop All Servers Script
# This script stops both the backend and frontend servers

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "   SENTIFY - Stopping Servers" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[*] Stopping all Sentify servers..." -ForegroundColor Yellow
Write-Host ""

# Stop processes running on port 5000 (Backend)
Write-Host "Stopping Backend Server (port 5000)..." -ForegroundColor Yellow
try {
    $backendProcesses = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($backendProcesses) {
        foreach ($pid in $backendProcesses) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Write-Host "[OK] Backend server stopped (PID: $pid)" -ForegroundColor Green
        }
    } else {
        Write-Host "[INFO] No backend server running on port 5000" -ForegroundColor Gray
    }
} catch {
    Write-Host "[INFO] No backend server running" -ForegroundColor Gray
}

# Stop processes running on port 3000 (Frontend)
Write-Host "Stopping Frontend Server (port 3000)..." -ForegroundColor Yellow
try {
    $frontendProcesses = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($frontendProcesses) {
        foreach ($pid in $frontendProcesses) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Write-Host "[OK] Frontend server stopped (PID: $pid)" -ForegroundColor Green
        }
    } else {
        Write-Host "[INFO] No frontend server running on port 3000" -ForegroundColor Gray
    }
} catch {
    Write-Host "[INFO] No frontend server running" -ForegroundColor Gray
}

# Also stop any Python processes running app.py
Write-Host "Cleaning up Python processes..." -ForegroundColor Yellow
try {
    $pythonProcesses = Get-Process -Name python -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*app.py*" }
    if ($pythonProcesses) {
        $pythonProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
        Write-Host "[OK] Python backend processes stopped" -ForegroundColor Green
    }
} catch {
    # Silent fail
}

# Stop any Node processes
Write-Host "Cleaning up Node processes..." -ForegroundColor Yellow
try {
    $nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
        Write-Host "[OK] Node frontend processes stopped" -ForegroundColor Green
    }
} catch {
    # Silent fail
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "   ALL SERVERS STOPPED!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
