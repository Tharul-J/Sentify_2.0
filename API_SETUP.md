# Sentify - Multi-API Configuration Guide

## News API Keys (Add to backend/.env)

Sentify uses a **fallback system** for news APIs. Add as many as you can for better reliability:

### 1. Alpha Vantage News (Already configured ✓)
```
ALPHA_VANTAGE_KEY=O3DMTMSZQPJKPH9G
```
- Free tier: 25 requests/day
- Includes sentiment scores
- **Priority: #1** (tried first)

### 2. Finnhub (Recommended)
```
FINNHUB_API_KEY=your_key_here
```
- Sign up: https://finnhub.io/register
- Free tier: 60 API calls/minute
- **Priority: #2**

### 3. NewsAPI (Already configured ✓)
```
NEWS_API_KEY=076928852eeb4652a0de2f80db85c918
```
- Free tier: 100 requests/day, 1 month history limit
- **Priority: #3**

### 4. Polygon.io
```
POLYGON_API_KEY=your_key_here
```
- Sign up: https://polygon.io/dashboard/signup
- Free tier: 5 API calls/minute
- **Priority: #4**

### 5. NewsData.io
```
NEWSDATA_API_KEY=your_key_here
```
- Sign up: https://newsdata.io/register
- Free tier: 200 requests/day
- **Priority: #5**

---

## AI Model Keys (frontend .env.local)

### Gemini AI
```
VITE_GEMINI_API_KEY=AIzaSyBXlQpHLCsICHhxoDt0WABdwVZeF-pYLU4
```
Already configured ✓

---

## Installation Steps

### 1. Install Python Dependencies (FinBERT Model)
```bash
cd backend
pip install -r requirements.txt
```

This will install:
- FinBERT transformer model
- PyTorch for model inference
- All existing dependencies

**Note:** First run will download the FinBERT model (~500MB). This is a one-time download.

### 2. Add Optional API Keys
Edit `backend/.env` and add any additional news API keys you obtain:

```env
# Existing (already set)
NEWS_API_KEY=076928852eeb4652a0de2f80db85c918
ALPHA_VANTAGE_KEY=O3DMTMSZQPJKPH9G

# Add these (optional but recommended)
FINNHUB_API_KEY=
NEWSDATA_API_KEY=
POLYGON_API_KEY=
```

### 3. Start the Application
```bash
npm start
```

---

## How the Fallback System Works

When you analyze a stock:
1. **Tries Alpha Vantage News API** first (fastest, includes sentiment)
2. **Falls back to Finnhub** if Alpha Vantage fails
3. **Falls back to NewsAPI** if Finnhub fails
4. **Falls back to Polygon** if NewsAPI fails
5. **Falls back to NewsData** if Polygon fails
6. **Uses mock data** only if all APIs fail

**Benefits:**
- High reliability even with free tiers
- Automatic failover
- More articles from multiple sources
- No single point of failure

---

## Dual-Model Sentiment Analysis

### When both Gemini and FinBERT are selected:

**For each article, you'll see:**
- ✅ Gemini's sentiment score (general AI)
- ✅ FinBERT's sentiment score (financial specialist)
- ✅ Agreement status
- ✅ Combined/ensemble score
- ✅ Confidence comparison

**Dashboard shows:**
- Model agreement percentage
- Individual model performance metrics
- Side-by-side comparisons
- Disagreement analysis

**Ensemble Logic:**
- If models **agree**: High confidence (average of both)
- If models **disagree**: Lower confidence, uses higher-confidence prediction

---

## Quick Start (Minimum Setup)

Already working with:
- Alpha Vantage ✓
- NewsAPI ✓  
- Gemini ✓

Just run:
```bash
pip install -r requirements.txt  # Install FinBERT
npm start                         # Start app
```

Add more API keys later for better reliability!
