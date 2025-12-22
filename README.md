# 🎯 Sentify 2.0

<div align="center">

**AI-Powered Stock Sentiment Analysis Platform**

Real-time financial news sentiment analysis using dual AI models (Gemini & FinBERT) with multi-source news aggregation

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Dual Model Analysis](#-dual-model-sentiment-analysis)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Overview

Sentify 2.0 is a sophisticated financial sentiment analysis platform that combines multiple AI models and news sources to provide comprehensive market sentiment insights. The platform analyzes news articles from 5+ sources using both Google Gemini AI and FinBERT (specialized financial model) to deliver accurate, real-time sentiment analysis.

### Key Highlights

- 🤖 **Dual AI Models**: Gemini (general AI) + FinBERT (financial specialist)
- 📰 **Multi-Source News**: 5 news APIs with automatic fallback
- 📊 **Rich Visualizations**: Interactive charts and performance metrics
- 🔄 **Real-Time Analysis**: Live market data and sentiment scoring
- 🎨 **Modern UI**: Sleek dark theme with responsive design
- 🚀 **High Reliability**: Fallback system ensures continuous operation

---

## ✨ Features

### 🔍 Analysis Capabilities
- **Real-time stock search** across major exchanges
- **Live market data** with current prices and daily changes
- **Multi-source news aggregation** (up to 50 articles per analysis)
- **Dual-model sentiment analysis** with agreement metrics
- **Confidence scoring** for prediction reliability
- **Model performance comparison** with radar charts

### 📊 Dashboard Features
- **5 KPI Cards**: Overall mood, confidence, article count, sentiment score, active models
- **Sentiment Distribution**: Interactive pie charts
- **Confidence Analysis**: Per-article bar charts
- **Sentiment Timeline**: Area charts showing trends
- **Model Comparison**: Side-by-side performance metrics
- **News Filtering**: Filter by positive, neutral, or negative sentiment
- **High Confidence Badges**: Highlight reliable predictions

### 🎯 AI Models
- **Gemini AI**: Google's advanced language model for comprehensive analysis
- **FinBERT**: Specialized transformer model trained on financial texts
- **Ensemble Logic**: Combined scoring when models agree/disagree
- **Agreement Analysis**: Track how often models align

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.3 | UI framework |
| TypeScript | 5.6+ | Type safety |
| Vite | 6.4.1 | Build tool & dev server |
| Tailwind CSS | 3.4.17 | Styling |
| Recharts | 2.15.0 | Data visualization |
| Lucide React | 0.562.0 | Icons |
| Google GenAI | Latest | Gemini API integration |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.8+ | Backend language |
| Flask | 3.0.0 | Web framework |
| Transformers | 4.36.0+ | FinBERT model |
| PyTorch | 2.1.0+ | ML inference |
| yfinance | Latest | Stock market data |
| NewsAPI | Latest | News aggregation |
| Flask-CORS | 4.0.0 | CORS handling |

### News APIs (Multi-Source Fallback)
1. **Finnhub** (Primary - 2 keys)
2. **Alpha Vantage** (Includes sentiment scores)
3. **NewsData.io**
4. **NewsAPI**
5. **Polygon.io**

---

## 📁 Project Structure

```
sentify/
├── components/              # React components
│   ├── Dashboard.tsx       # Main analytics dashboard
│   ├── Hero.tsx            # Landing page
│   ├── StockSelector.tsx   # Stock search UI
│   └── AnalysisConfigModal.tsx # Model configuration
├── services/               # Frontend services
│   ├── geminiService.ts    # Gemini AI integration
│   ├── finbertService.ts   # FinBERT API client
│   └── marketService.ts    # Market data API
├── backend/                # Python Flask API
│   ├── app.py             # Main server (729 lines)
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Backend config (gitignored)
├── types.ts                # TypeScript definitions
├── .env.local              # Frontend config (gitignored)
├── package.json            # Node dependencies
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/))
- **Git** ([Download](https://git-scm.com/))

### 1. Clone Repository
```bash
git clone https://github.com/Tharul-J/Sentify_2.0.git
cd Sentify_2.0
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies (includes FinBERT ~500MB)
pip install -r requirements.txt

# Create environment file
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux
```

**Edit `backend/.env` and add your API keys:**
```env
NEWS_API_KEY=your_newsapi_key
ALPHA_VANTAGE_KEY=your_alphavantage_key
FINNHUB_API_KEY=your_finnhub_key
FINNHUB_API_KEY_2=your_second_finnhub_key
NEWSDATA_API_KEY=your_newsdata_key
```

### 3. Frontend Setup
```bash
cd ..  # Back to root directory

# Install dependencies
npm install

# Create environment file
copy .env.example .env.local  # Windows
# cp .env.example .env.local  # macOS/Linux
```

**Edit `.env.local` and add your Gemini API key:**
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start Application

**Option 1: Automated Start (Recommended)**
```bash
npm start
```
This starts both backend and frontend simultaneously.

**Option 2: Manual Start (Separate Terminals)**

Terminal 1 - Backend:
```bash
cd backend
venv\Scripts\python.exe app.py  # Windows
# source venv/bin/activate && python app.py  # macOS/Linux
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 5. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## ⚙️ Configuration

### API Keys (Required)

#### 1. Google Gemini API (Frontend)
- **Get Key**: https://aistudio.google.com/app/apikey
- **Free Tier**: Available
- **Add to**: `.env.local` → `VITE_GEMINI_API_KEY`

#### 2. News API Keys (Backend)

Add at least one for basic functionality. More APIs = better reliability.

| Provider | Signup Link | Free Tier | Priority |
|----------|-------------|-----------|----------|
| **Finnhub** | https://finnhub.io/register | 60 calls/min | #1 |
| **Alpha Vantage** | https://www.alphavantage.co/support/#api-key | 25 calls/day | #2 |
| **NewsData.io** | https://newsdata.io/register | 200 calls/day | #3 |
| **NewsAPI** | https://newsapi.org/register | 100 calls/day | #4 |
| **Polygon.io** | https://polygon.io/dashboard/signup | 5 calls/min | #5 |

### Environment Files

**`.env.local` (Frontend)**
```env
VITE_GEMINI_API_KEY=your_key_here
VITE_API_BASE_URL=http://localhost:5000
```

**`backend/.env` (Backend)**
```env
NEWS_API_KEY=your_newsapi_key
ALPHA_VANTAGE_KEY=your_alphavantage_key
FINNHUB_API_KEY=your_finnhub_key
FINNHUB_API_KEY_2=your_second_finnhub_key  # Optional backup
NEWSDATA_API_KEY=your_newsdata_key
POLYGON_API_KEY=your_polygon_key
```

---

## 📡 API Documentation

### Backend Endpoints

#### `GET /api/search?q={query}`
Search for stock tickers.

**Response:**
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 195.71,
    "change": 2.15
  }
]
```

#### `GET /api/news?symbol={symbol}&range={timeRange}`
Get news articles for a stock.

**Parameters:**
- `symbol`: Stock ticker (e.g., AAPL)
- `range`: Time filter (1d, 1w, 1m, 3m, 6m, 1y, 3y, 5y)

**Response:**
```json
[
  {
    "id": "AAPL_fh_0",
    "title": "Apple Announces New Product",
    "source": "Finnhub",
    "publishedAt": "2025-12-22T10:00:00",
    "url": "https://...",
    "summary": "Apple today announced..."
  }
]
```

#### `POST /api/sentiment/finbert`
Analyze sentiment using FinBERT.

**Request:**
```json
{
  "texts": ["Article 1 text", "Article 2 text"]
}
```

**Response:**
```json
[
  {
    "sentiment": "positive",
    "confidence": 0.9234,
    "scores": {
      "positive": 0.9234,
      "negative": 0.0421,
      "neutral": 0.0345
    }
  }
]
```

---

## 🤖 Dual Model Sentiment Analysis

### How It Works

When both models are enabled:

1. **Individual Analysis**
   - Gemini analyzes news for comprehensive sentiment
   - FinBERT analyzes with financial domain expertise

2. **Agreement Calculation**
   - Compare sentiment predictions
   - Calculate agreement percentage
   - Track model alignment

3. **Ensemble Scoring**
   ```
   If models AGREE:
     → High confidence (average both scores)
   
   If models DISAGREE:
     → Lower confidence (0.7x penalty)
     → Use higher-confidence prediction
   ```

### Dashboard Metrics

- **Model Agreement %**: How often models align
- **Performance Radar**: Accuracy, Precision, Recall, F1-Score
- **Processing Time**: Speed comparison
- **Confidence Distribution**: Per-model confidence levels

### Example Output

```
📈 Article: "Apple reports record Q4 earnings"

Gemini:     Positive (89% confidence)
FinBERT:    Positive (92% confidence)
Agreement:  ✅ YES
Final:      Positive (90.5% confidence - averaged)

---

📉 Article: "Tech sector faces uncertainty"

Gemini:     Negative (75% confidence)
FinBERT:    Neutral (68% confidence)
Agreement:  ❌ NO
Final:      Negative (52.5% confidence - penalized)
```

---

## 🎨 Features Showcase

### News Filtering
Filter articles by sentiment:
- **All News** - Show everything
- **📈 Positive** - Only positive sentiment
- **➖ Neutral** - Only neutral sentiment  
- **📉 Negative** - Only negative sentiment

Each filter shows article count in real-time.

### Model Selection
Choose analysis models:
- **Gemini Only** - Fast, comprehensive
- **FinBERT Only** - Specialized, financial focus
- **Both Models** - Maximum accuracy, comparison view

### Time Ranges
Analyze different periods:
- 24 Hours, 1 Week, 2 Weeks
- 1 Month, 3 Months, 6 Months
- 1 Year, 3 Years, 5 Years

---

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

**2. FinBERT Model Not Loading**
```bash
cd backend
pip uninstall transformers torch
pip install transformers==4.36.0 torch==2.1.0
```

**3. CORS Errors**
- Ensure backend is running on port 5000
- Check `.env.local` has `VITE_API_BASE_URL=http://localhost:5000`

**4. No News Articles**
- Verify at least one news API key is valid
- Check backend console for API error messages
- Try different stock symbols

**5. Gemini API Errors**
- Verify API key in `.env.local`
- Check quota at https://aistudio.google.com/
- Try using FinBERT only

### Debug Mode

Enable verbose logging:

**Backend:**
```python
# In app.py, set:
app.debug = True
```

**Frontend:**
```bash
# Check browser console (F12)
```

---

## 📝 Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

### Backend Development
```bash
cd backend
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

python app.py                # Start server (debug mode)
pip freeze > requirements.txt # Update dependencies
```

### Code Structure

**Frontend Components:**
- `Hero.tsx` - Landing page with gradient animations
- `StockSelector.tsx` - Stock search with live results
- `Dashboard.tsx` - Main analytics view (947 lines)
- `AnalysisConfigModal.tsx` - Model configuration

**Backend Modules:**
- News fetching (5 API integrations)
- FinBERT sentiment analysis
- Stock data retrieval (yfinance)
- Caching system (5-minute TTL)
- Fallback mechanisms

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Google Gemini** - Advanced AI capabilities
- **Hugging Face** - FinBERT model
- **News API Providers** - Finnhub, Alpha Vantage, NewsAPI, NewsData.io, Polygon.io
- **Yahoo Finance** - Market data via yfinance
- **React Community** - UI framework and ecosystem

---

## 📧 Contact

**Project Link**: [https://github.com/Tharul-J/Sentify_2.0](https://github.com/Tharul-J/Sentify_2.0)

---

<div align="center">

**Built with ❤️ using React, TypeScript, Flask, and AI**

⭐ Star this repo if you find it helpful!

</div>
