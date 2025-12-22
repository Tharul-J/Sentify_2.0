# 🚀 Quick Start Guide - Sentify

## Easy Ways to Start Both Servers

### Option 1: Double-Click Start (Recommended) ⭐

**Windows - Batch File:**
```
Double-click: start.bat
```
This opens two separate terminal windows - one for backend, one for frontend.

**Windows - PowerShell:**
```
Right-click start.ps1 → Run with PowerShell
```

### Option 2: Single Terminal Command

From the project root, run:
```bash
npm start
```
or
```bash
npm run dev:all
```

This runs both servers in one terminal using `concurrently`.

### Option 3: Manual Start (Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\python.exe app.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📡 Server URLs

Once started, access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🛑 Stopping the Servers

- **Batch/PowerShell**: Close the terminal windows
- **npm start**: Press `Ctrl+C` in the terminal
- **Manual**: Press `Ctrl+C` in each terminal

## 🔧 Individual Server Commands

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run dev:backend
```

## ⚠️ Troubleshooting

**Port already in use:**
- Close any existing instances
- Check Task Manager for node.exe or python.exe processes

**Backend not starting:**
- Ensure virtual environment is created: `cd backend && python -m venv venv`
- Reinstall dependencies: `cd backend && venv\Scripts\pip.exe install -r requirements.txt`

**Frontend not loading:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📝 First Time Setup

If this is your first time:
1. Install backend dependencies:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\pip.exe install -r requirements.txt
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (already done if you followed setup)
   - Backend: `backend\.env`
   - Frontend: `.env.local`

4. Start the app:
   ```bash
   npm start
   ```
