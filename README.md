<img width="1563" height="432" alt="image" src="https://github.com/user-attachments/assets/a8803c1c-9b07-4cb5-aa45-d3ca8f56f3cb" />


# 💹 Sentify 2.0

**AI-Powered Stock Sentiment Analysis Platform**

Real-time financial news sentiment analysis using dual AI models (Gemini & FinBERT) with multi-source news aggregation.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)

---

## ✨ Features

- 🤖 **Dual AI Models** - Gemini AI + FinBERT (financial specialist)
- 📰 **Multi-Source News** - 5 news APIs with automatic fallback
- 📊 **Rich Visualizations** - Interactive charts, KPIs, and performance metrics
- 🔄 **Real-Time Analysis** - Live market data and sentiment scoring
- 🎨 **Modern UI** - Sleek dark theme with responsive design
- 🎯 **Sentiment Filtering** - Filter news by positive, neutral, or negative

---

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts  
**Backend:** Python, Flask, Transformers (FinBERT), PyTorch  
**APIs:** Gemini AI, Finnhub, Alpha Vantage, NewsAPI, NewsData.io, Polygon.io

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+

### 1. Clone & Install

```bash
git clone https://github.com/Tharul-J/Sentify_2.0.git
cd Sentify_2.0

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
cd ..
```

### 2. Configure API Keys

**Create `.env.local` in root:**
```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_API_BASE_URL=http://localhost:5000
```

**Create `backend/.env`:**
```env
NEWS_API_KEY=your_newsapi_key
ALPHA_VANTAGE_KEY=your_alphavantage_key
FINNHUB_API_KEY=your_finnhub_key
FINNHUB_API_KEY_2=your_second_finnhub_key
NEWSDATA_API_KEY=your_newsdata_key
```

**Get API Keys:**
- Gemini: https://aistudio.google.com/app/apikey
- NewsAPI: https://newsapi.org/register
- Alpha Vantage: https://www.alphavantage.co/support/#api-key
- Finnhub: https://finnhub.io/register
- NewsData: https://newsdata.io/register

### 3. Start Application

```bash
npm start
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📡 API Endpoints

```
GET  /api/search?q={query}           # Search stocks
GET  /api/news?symbol={symbol}&range={timeRange}  # Get news
POST /api/sentiment/finbert           # FinBERT analysis
GET  /health                          # Health check
```

---

## 🤖 Dual Model Analysis

**How it works:**

1. **Both models analyze** the same news article
2. **Agreement check** - Do they match?
3. **Ensemble scoring:**
   - ✅ If agree → High confidence (averaged)
   - ❌ If disagree → Lower confidence (penalized)

**Dashboard shows:**
- Model agreement percentage
- Performance comparison (radar chart)
- Side-by-side sentiment scores
- Confidence analysis

---

## 🎨 Key Features

### Sentiment Filter
Filter news by:
- 📈 Positive - Bullish news only
- ➖ Neutral - Balanced news
- 📉 Negative - Bearish news only

### Model Selection
- Gemini Only
- FinBERT Only
- Both Models (comparison view)

### Time Ranges
24H, 1W, 2W, 1M, 3M, 6M, 1Y, 3Y, 5Y

---

## 🐛 Troubleshooting

**Port in use:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**FinBERT not loading:**
```bash
pip install --upgrade transformers torch
```

**No news articles:**
- Check API keys in `backend/.env`
- Verify at least one news API key is valid

**CORS errors:**
- Ensure backend runs on port 5000
- Check `VITE_API_BASE_URL` in `.env.local`

---

## 📁 Project Structure

```
sentify/
├── components/         # React components
├── services/          # API services
├── backend/           # Flask API
│   ├── app.py        # Main server
│   └── .env          # API keys
├── .env.local         # Frontend config
└── package.json       # Dependencies
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use this project!

---


<div align="center">

**By - Tharul-J**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/Tharul-J/Sentify_2.0/issues) · [Request Feature](https://github.com/Tharul-J/Sentify_2.0/issues)

</div>
