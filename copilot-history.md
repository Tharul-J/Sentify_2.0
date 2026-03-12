# Sentify Development Session - March 12, 2026

## Session Summary
This document captures the development history and changes made to the Sentify financial sentiment analysis application.

---

## Features Implemented

### 1. Enhanced PDF Export Report
**Location:** `components/Dashboard.tsx`

The PDF export was significantly enhanced to include:
- **Page 1:**
  - Professional header with company name and timestamp
  - Executive Summary (auto-generated paragraph)
  - 4 KPI cards (Market Mood, Articles Analyzed, Avg Confidence, Model Agreement)
  - Pie chart for sentiment distribution
  - Sentiment Timeline bar chart
  - Model Performance Comparison table (Gemini vs FinBERT)
  - Model Sentiment Breakdown table
  - AI Investment Insight box
- **Page 2:**
  - Enhanced News Articles table with both model columns
- Footer with page numbers and branding

### 2. UI Spacing Fix
**Location:** `components/Home.tsx`, `components/Hero.tsx`

- Increased gap between "Get started" button and "Powered by FinBERT & Gemini AI" text
- Changed `bottom-8` to `bottom-4` for better visual separation

### 3. Analysis Depth Selector
**Location:** `components/AnalysisConfigModal.tsx`, `backend/app.py`, `services/marketService.ts`

Added a new "Analysis Depth" selector independent of time range:
- **Quick** (~20 articles) - Fast analysis, fewer API calls
- **Standard** (~40 articles) - Balanced, recommended default  
- **Deep** (~75 articles) - Comprehensive analysis

**Rationale:** Separates "how far back to look" (time range) from "how many articles to analyze" (depth). This saves API quota and gives users control over analysis thoroughness.

### 4. Modal Scroll Fix
**Location:** `components/AnalysisConfigModal.tsx`

Fixed the Configure Analysis modal to:
- Have maximum height of 90% viewport
- Scrollable content area
- Fixed footer with "Cancel" and "Analyze Sentiment" buttons always visible

---

## API Key Configuration

### Gemini API Keys (6 keys with rotation)
Located in `.env.local`:
```
VITE_GEMINI_API_KEY=AIzaSyBB7H9WoA6n3J5xWvxKI_FXk-beISF6xRM
VITE_GEMINI_API_KEY_2=AIzaSyDZ3Bsq5dH7cOVv7GYmJLZTbqsq4zSFtUw
VITE_GEMINI_API_KEY_3=AIzaSyAngTLyafH4f_xr_DwC4eGBDdPctSQk58k
VITE_GEMINI_API_KEY_4=AIzaSyC4jEqCPnSp_9MxxPGo9kHBU9FYsfRmDJQ
VITE_GEMINI_API_KEY_5=AIzaSyBXRMLOYy6Wne_wqz5t1JmQPSt_9z1HH1E
VITE_GEMINI_API_KEY_6=AIzaSyCk674kWYBIPCWgbUV-a9671EQ6vl-9dY0
```

### News API Keys
- Finnhub (2 keys)
- Alpha Vantage
- NewsAPI
- NewsData
- Polygon

---

## Technical Stack

### Frontend
- React 19
- Vite 6.4.1
- TypeScript 5.8.2
- Recharts 3.6 (charts)
- Tailwind CSS 3.4.17
- jsPDF + jspdf-autotable (PDF export)

### Backend
- Flask 3.0
- Python with FinBERT (ProsusAI/finbert)
- PyTorch
- Running on localhost:5000

### AI Models
- **Gemini 3 Flash Preview** - 6 API keys with automatic rotation on quota errors
- **FinBERT** - Local model, no API cost

---

## Key Files Modified

| File | Changes |
|------|---------|
| `components/Dashboard.tsx` | Enhanced PDF export with charts, metrics, AI insights |
| `components/AnalysisConfigModal.tsx` | Added depth selector, fixed modal scrolling |
| `components/Home.tsx` | Spacing fix for button/text |
| `components/Hero.tsx` | Spacing fix for button/text |
| `services/marketService.ts` | Added depth parameter to fetchCompanyNews |
| `services/geminiService.ts` | 6-key rotation system |
| `backend/app.py` | Depth-based article limits, updated all news fetch functions |
| `.env.local` | 6 Gemini API keys configured |

---

## Running the Application

```powershell
# Backend (Terminal 1)
cd backend
.\venv\Scripts\python.exe app.py

# Frontend (Terminal 2)  
npm run dev
```

- Frontend: http://localhost:3000/
- Backend: http://localhost:5000/

---

## Design Decisions

### Why separate Time Range from Analysis Depth?
- Time range should control *how far back* to look, not *how many* articles
- More articles = more API calls (especially for Gemini)
- Users can choose depth based on their needs:
  - Quick demo: 20 articles
  - Normal use: 40 articles
  - Deep analysis: 75 articles
- Results cached for 5 minutes regardless of depth

### Gemini API Key Rotation
- 6 keys rotate automatically on quota errors (429)
- Keys marked as exhausted for 1 hour before retry
- Fallback to FinBERT if all keys exhausted

---

## Popular Tickers (17 stocks)
NVDA, TSLA, AAPL, MSFT, GOOGL, META, AMZN, AMD, NFLX, SONY, SSNLF, TM, DELL, HSBC, NSRGY, BYDDY, BMWYY

---

*Session Date: March 12, 2026*
