# 🚀 Sentify - Quick Start Guide

## One-Command Setup & Run

Open VS Code, open this folder, then run **ONE** of these commands in the terminal:

### Windows (PowerShell) - RECOMMENDED
```powershell
.\setup-and-run.ps1
```

### Windows (Command Prompt)
```cmd
.\start.bat
```

### First Time Setup?
If you get a PowerShell execution policy error, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## What This Does

The script automatically:
1. ✅ Checks if Node.js and Python are installed
2. ✅ Installs frontend dependencies (`npm install`)
3. ✅ Creates Python virtual environment
4. ✅ Installs backend dependencies
5. ✅ Creates `.env` files if missing
6. ✅ Starts BOTH servers in separate windows

---

## After Running

Two windows will open:
- **Backend Server** (Flask) → http://localhost:5000
- **Frontend Server** (Vite) → http://localhost:3000

The frontend will automatically open in your browser!

---

## 🛑 How to Close/Stop the Application

### Quick Method (RECOMMENDED)

**PowerShell:**
```powershell
.\stop.ps1
```

**Command Prompt:**
```cmd
.\stop.bat
```

This will automatically stop both servers!

### Manual Method
Simply close the two server windows (Backend & Frontend) that were opened.

### Alternative - Keyboard Shortcut
In each server window, press: `Ctrl + C` to stop the server.

---

## For Anyone

**Share this repository and tell them:**

1. Install [Node.js](https://nodejs.org/) (if not installed)
2. Install [Python](https://python.org/) (if not installed)
3. Open the folder in VS Code
4. Open terminal and run: `.\setup-and-run.ps1`
5. Done! 🎉

---

## Troubleshooting

### "Python not found"
- Install Python from [python.org](https://python.org/)
- Make sure "Add Python to PATH" is checked during installation

### "Node.js not found"
- Install Node.js from [nodejs.org](https://nodejs.org/)

### "Execution policy error"
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Backend won't start / API errors
- Edit `backend\.env` and add your API keys:
  - Get NEWS_API_KEY from [newsapi.org](https://newsapi.org/)
  - Optional: Add other API keys listed in `.env.example`

---

## Manual Setup (If Script Fails)

### Frontend:
```bash
npm install
npm run dev
```

### Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

## Need Help?

Check the detailed guides:
- `SETUP_GUIDE.md` - Full setup instructions
- `backend/README.md` - Backend configuration
- `API_SETUP.md` - API keys setup
