# Sentify - Complete Setup & Run Script
# This script installs all dependencies and starts both servers
# Run this command in VS Code terminal: .\setup-and-run.ps1

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "   SENTIFY - Setup & Run Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "[*] Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js $nodeVersion installed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if Python is installed
try {
    $pythonVersion = python --version
    Write-Host "[OK] Python $pythonVersion installed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python not found. Please install Python from https://python.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[*] Setting up Frontend..." -ForegroundColor Cyan

# Install frontend dependencies if needed
if (!(Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies (this may take a few minutes)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Frontend setup failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "[OK] Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[OK] Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "[*] Setting up Backend..." -ForegroundColor Cyan

# Create backend virtual environment if it doesn't exist
if (!(Test-Path "backend\venv")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv backend\venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to create virtual environment!" -ForegroundColor Red
        exit 1
    }
    Write-Host "[OK] Virtual environment created" -ForegroundColor Green
} else {
    Write-Host "[OK] Virtual environment already exists" -ForegroundColor Green
}

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
& "backend\venv\Scripts\python.exe" -m pip install --upgrade pip --quiet
& "backend\venv\Scripts\pip.exe" install -r backend\requirements.txt --quiet
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Backend setup failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Backend dependencies installed" -ForegroundColor Green

# Check for .env files
Write-Host ""
Write-Host "[*] Checking environment files..." -ForegroundColor Cyan
if (!(Test-Path "backend\.env")) {
    Write-Host "[WARNING] backend\.env not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "[NOTE] Please edit backend\.env and add your API keys!" -ForegroundColor Yellow
}
if (!(Test-Path ".env.local")) {
    Write-Host "[INFO] .env.local not found (optional for frontend)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[*] Starting Servers..." -ForegroundColor Green
Write-Host ""

# Start Backend in new window
Write-Host "[*] Starting Backend Server (Flask on port 5000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '[BACKEND] Server Running...' -ForegroundColor Green; .\venv\Scripts\python.exe app.py"

# Wait for backend to initialize
Start-Sleep -Seconds 4

# Start Frontend in new window
Write-Host "[*] Starting Frontend Server (Vite on port 3000)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host '[FRONTEND] Server Running...' -ForegroundColor Blue; npm run dev"

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "   SENTIFY IS NOW RUNNING!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "The servers are running in separate windows" -ForegroundColor Cyan
Write-Host "Close those windows to stop the servers" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
