# Sentify Backend

Python Flask server providing real market data and news for the Sentify React frontend.

## Setup Instructions

### 1. Create Virtual Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your API keys
# Get News API key from: https://newsapi.org/
```

### 4. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /api/search?q={query}
Search for stock tickers matching a query.

**Response:**
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 173.50,
    "change": 1.25
  }
]
```

### GET /api/news?symbol={symbol}&range={timeFilter}
Get news articles for a specific stock.

**Parameters:**
- `symbol`: Stock ticker (e.g., "AAPL")
- `range`: Time filter - "1d", "1w", "1m", "3m", "6m", "1y" (default: "1w")

**Response:**
```json
[
  {
    "id": "AAPL_0",
    "title": "Apple announces new product",
    "source": "TechCrunch",
    "publishedAt": "2024-05-20T10:00:00Z",
    "url": "https://...",
    "summary": "Article summary..."
  }
]
```

### GET /health
Health check endpoint to verify server status.

## Tech Stack

- **Flask**: Web framework
- **yfinance**: Real-time stock market data
- **newsapi-python**: News articles
- **flask-cors**: Enable CORS for React frontend
- **python-dotenv**: Environment variable management

## Development Notes

- The server runs with `debug=True` for development
- CORS is enabled for all origins (restrict in production)
- News API has rate limits on free tier (100 requests/day)
- yfinance data is fetched in real-time from Yahoo Finance
