# Sentify - Real-Time Stock Sentiment Analysis

A full-stack application that analyzes market sentiment using AI-powered news analysis.

## 🏗️ Project Structure

```
sentify/
├── backend/           # Python Flask API
│   ├── app.py        # Main Flask server
│   ├── requirements.txt
│   ├── .env          # Backend environment variables (create from .env.example)
│   └── README.md     # Backend setup instructions
├── components/        # React components
├── services/          # Frontend API services
├── .env.local        # Frontend environment variables (create from .env.example)
└── package.json      # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Edit .env and add your API keys:
# - NEWS_API_KEY from https://newsapi.org/
```

### 2. Frontend Setup

```bash
# From project root
npm install

# Create environment file
copy .env.example .env.local

# Edit .env.local and add:
# - VITE_GEMINI_API_KEY from https://aistudio.google.com/app/apikey
# - VITE_API_BASE_URL=http://localhost:5000
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # On Windows
python app.py
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## 🔑 API Keys Required

1. **News API** (Backend)
   - Sign up at https://newsapi.org/
   - Free tier: 100 requests/day
   - Add to `backend/.env` as `NEWS_API_KEY`

2. **Google Gemini API** (Frontend)
   - Get key at https://aistudio.google.com/app/apikey
   - Free tier available
   - Add to `.env.local` as `VITE_GEMINI_API_KEY`

## 🎯 Features

- **Real-time Stock Search**: Search for any stock ticker using yfinance
- **Live Market Data**: Current prices and daily changes
- **News Aggregation**: Recent news articles from multiple sources
- **AI Sentiment Analysis**: Google Gemini analyzes news sentiment
- **Interactive Dashboard**: Visual sentiment distribution with Recharts

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Recharts (data visualization)
- Lucide React (icons)
- Google Gemini API (AI sentiment analysis)

### Backend
- Python 3.8+
- Flask (web framework)
- yfinance (stock market data)
- newsapi-python (news aggregation)
- flask-cors (CORS handling)

## 📡 API Endpoints

### Backend Endpoints

**GET /api/search?q={query}**
- Search for stock tickers
- Returns: Array of `{symbol, name, price, change}`

**GET /api/news?symbol={symbol}&range={timeFilter}**
- Get news for a specific stock
- Time filters: 1d, 1w, 1m, 3m, 6m, 1y
- Returns: Array of news articles

**GET /health**
- Health check endpoint

## 🔧 Development

### Frontend Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
# Activate virtual environment first
python app.py    # Runs with debug=True
```

## 📝 Migration Notes

This project was migrated from a Vibe Coding prototype to a full local development environment:

- ✅ Replaced mock data with real yfinance API
- ✅ Integrated NewsAPI for real news articles
- ✅ Maintained existing React frontend code
- ✅ Added proper environment variable management
- ✅ Set up Python Flask backend with CORS
- ✅ Kept Gemini AI on frontend for sentiment analysis

## 🐛 Troubleshooting

**CORS Errors:**
- Ensure backend server is running on port 5000
- Check that `VITE_API_BASE_URL` matches backend URL

**No News Showing:**
- Verify `NEWS_API_KEY` is set in `backend/.env`
- Check NewsAPI rate limits (100 requests/day on free tier)

**Stock Search Returns Empty:**
- Some tickers may not be available in yfinance
- Try using exact ticker symbols (e.g., "AAPL" instead of "Apple")

**Sentiment Analysis Not Working:**
- Verify `VITE_GEMINI_API_KEY` in `.env.local`
- Check Gemini API quotas

## 📄 License

MIT

## 🙏 Acknowledgments

- Market data powered by [yfinance](https://github.com/ranaroussi/yfinance)
- News from [NewsAPI](https://newsapi.org/)
- AI analysis by [Google Gemini](https://ai.google.dev/)
