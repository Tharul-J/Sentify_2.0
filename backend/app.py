"""
Sentify Backend - Flask API Server
Provides real market data and dual-model sentiment analysis
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
from newsapi import NewsApiClient
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import time
from functools import lru_cache
import requests
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize FinBERT model for sentiment analysis
print("Loading FinBERT model...")
try:
    finbert_tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
    finbert_model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
    finbert_model.eval()
    print("[OK] FinBERT model loaded successfully")
    FINBERT_AVAILABLE = True
except Exception as e:
    print(f"[WARNING] FinBERT model failed to load: {e}")
    FINBERT_AVAILABLE = False

# Initialize News API clients
NEWS_API_KEY = os.getenv('NEWS_API_KEY')
ALPHA_VANTAGE_KEY = os.getenv('ALPHA_VANTAGE_KEY')
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
FINNHUB_API_KEY_2 = os.getenv('FINNHUB_API_KEY_2')  # Fallback key
NEWSDATA_API_KEY = os.getenv('NEWSDATA_API_KEY')
POLYGON_API_KEY = os.getenv('POLYGON_API_KEY')

if NEWS_API_KEY:
    newsapi = NewsApiClient(api_key=NEWS_API_KEY)
    print("[OK] NewsAPI configured")
else:
    newsapi = None
    print("[WARNING] NEWS_API_KEY not found")

# Log available APIs
api_status = []
if ALPHA_VANTAGE_KEY:
    api_status.append("Alpha Vantage")
if FINNHUB_API_KEY:
    api_status.append("Finnhub")
if FINNHUB_API_KEY_2:
    api_status.append("Finnhub-2")
if NEWS_API_KEY:
    api_status.append("NewsAPI")
if POLYGON_API_KEY:
    api_status.append("Polygon")
if NEWSDATA_API_KEY:
    api_status.append("NewsData")

print(f"[OK] Active news sources: {', '.join(api_status) if api_status else 'None - using mock data'}")

# Cache for ticker data to avoid rate limiting
ticker_cache = {}
news_cache = {}
CACHE_DURATION = 300  # Cache for 5 minutes for real-time feel

# Fallback mock data when Yahoo Finance is rate limited
FALLBACK_DATA = {
    'AAPL': {'symbol': 'AAPL', 'name': 'Apple Inc.', 'price': 195.71, 'change': 2.15},
    'TSLA': {'symbol': 'TSLA', 'name': 'Tesla, Inc.', 'price': 354.82, 'change': -5.32},
    'GOOGL': {'symbol': 'GOOGL', 'name': 'Alphabet Inc.', 'price': 175.23, 'change': 1.84},
    'AMZN': {'symbol': 'AMZN', 'name': 'Amazon.com Inc.', 'price': 182.15, 'change': 3.21},
    'MSFT': {'symbol': 'MSFT', 'name': 'Microsoft Corp.', 'price': 425.17, 'change': 2.05},
    'NVDA': {'symbol': 'NVDA', 'name': 'NVIDIA Corp.', 'price': 875.28, 'change': 12.50},
    'META': {'symbol': 'META', 'name': 'Meta Platforms Inc.', 'price': 498.12, 'change': 5.67},
    'NFLX': {'symbol': 'NFLX', 'name': 'Netflix Inc.', 'price': 632.45, 'change': -2.13},
    'AMD': {'symbol': 'AMD', 'name': 'Advanced Micro Devices', 'price': 178.34, 'change': 4.21},
    'INTC': {'symbol': 'INTC', 'name': 'Intel Corp.', 'price': 42.89, 'change': -0.34},
    'BTC-USD': {'symbol': 'BTC-USD', 'name': 'Bitcoin USD', 'price': 97250.00, 'change': 1850.00},
    'ETH-USD': {'symbol': 'ETH-USD', 'name': 'Ethereum USD', 'price': 3521.45, 'change': 125.30},
}


@app.route('/api/search', methods=['GET'])
def search_tickers():
    """
    Search for stock tickers matching a query
    Query param: q (search query)
    Returns: Array of StockTicker objects
    """
    query = request.args.get('q', '').strip()
    
    if not query:
        # Return some popular tickers if no query
        default_symbols = ['AAPL', 'TSLA', 'GOOGL', 'AMZN', 'MSFT', 'NVDA', 'META', 'BTC-USD']
        results = []
        for symbol in default_symbols:
            try:
                ticker_data = get_ticker_info(symbol)
                if ticker_data:
                    results.append(ticker_data)
            except:
                continue
        return jsonify(results)
    
    # Search for tickers matching the query
    results = search_yfinance_tickers(query)
    return jsonify(results)


@app.route('/api/news', methods=['GET'])
def get_news():
    """
    Get news articles for a specific stock symbol with multi-API fallback
    Query params: 
      - symbol (stock ticker symbol)
      - range (time filter: '1d', '1w', '1m', etc.)
    Returns: Array of NewsItem objects
    """
    symbol = request.args.get('symbol', '').strip()
    time_filter = request.args.get('range', '1w')
    
    if not symbol:
        return jsonify({"error": "Symbol parameter is required"}), 400
    
    # Check cache first
    cache_key = f"{symbol}_{time_filter}"
    current_time = time.time()
    if cache_key in news_cache:
        cached_data, cache_time = news_cache[cache_key]
        if current_time - cache_time < CACHE_DURATION:
            print(f"Using cached news for {symbol}")
            return jsonify(cached_data), 200
    
    # Try multiple news APIs in order
    news_items = None
    
    # 1. Try Finnhub API first (we have 2 keys)
    if FINNHUB_API_KEY or FINNHUB_API_KEY_2:
        news_items = fetch_finnhub_news(symbol, time_filter)
        if news_items:
            news_cache[cache_key] = (news_items, current_time)
            return jsonify(news_items), 200
    
    # 2. Try Alpha Vantage News API
    news_items = fetch_alphavantage_news(symbol, time_filter)
    if news_items:
        news_cache[cache_key] = (news_items, current_time)
        return jsonify(news_items), 200
    
    # 3. Try NewsData.io
    if NEWSDATA_API_KEY:
        news_items = fetch_newsdata_news(symbol, time_filter)
        if news_items:
            news_cache[cache_key] = (news_items, current_time)
            return jsonify(news_items), 200
    
    # 4. Try NewsAPI
    if newsapi:
        news_items = fetch_newsapi_news(symbol, time_filter)
        if news_items:
            news_cache[cache_key] = (news_items, current_time)
            return jsonify(news_items), 200
    
    # 5. Try Polygon.io
    if POLYGON_API_KEY:
        news_items = fetch_polygon_news(symbol, time_filter)
        if news_items:
            news_cache[cache_key] = (news_items, current_time)
            return jsonify(news_items), 200
    
    # Fallback to mock data
    print(f"All news APIs failed for {symbol}, using mock data")
    mock_news = get_mock_news(symbol)
    news_cache[cache_key] = (mock_news, current_time)
    return jsonify(mock_news), 200


@app.route('/api/sentiment/finbert', methods=['POST'])
def analyze_with_finbert():
    """
    Analyze text sentiment using FinBERT model
    Request body: { "texts": ["text1", "text2", ...] }
    Returns: Array of sentiment results
    """
    if not FINBERT_AVAILABLE:
        return jsonify({"error": "FinBERT model not available"}), 503
    
    data = request.get_json()
    texts = data.get('texts', [])
    
    if not texts:
        return jsonify({"error": "No texts provided"}), 400
    
    results = []
    for text in texts:
        sentiment = analyze_sentiment_finbert(text)
        results.append(sentiment)
    
    return jsonify(results), 200


def get_ticker_info_alpha_vantage(symbol):
    """Get real-time stock data from Alpha Vantage API"""
    if not ALPHA_VANTAGE_KEY:
        return None
    
    try:
        # Alpha Vantage Global Quote endpoint
        url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_KEY}"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if 'Global Quote' in data and data['Global Quote']:
            quote = data['Global Quote']
            current_price = float(quote.get('05. price', 0))
            previous_close = float(quote.get('08. previous close', current_price))
            change = current_price - previous_close
            
            # Get company name from symbol search
            company_name = get_company_name_alpha_vantage(symbol)
            
            result = {
                'symbol': symbol,
                'name': company_name or symbol,
                'price': round(current_price, 2),
                'change': round(change, 2)
            }
            
            print(f"✓ Real-time data from Alpha Vantage: {symbol} = ${current_price}")
            return result
        else:
            print(f"Alpha Vantage: No data for {symbol}")
            return None
            
    except Exception as e:
        print(f"Alpha Vantage error for {symbol}: {e}")
        return None


def get_company_name_alpha_vantage(symbol):
    """Get company name from Alpha Vantage"""
    # Common company names mapping
    names = {
        'AAPL': 'Apple Inc.',
        'TSLA': 'Tesla Inc.',
        'GOOGL': 'Alphabet Inc.',
        'AMZN': 'Amazon.com Inc.',
        'MSFT': 'Microsoft Corporation',
        'NVDA': 'NVIDIA Corporation',
        'META': 'Meta Platforms Inc.',
        'NFLX': 'Netflix Inc.',
        'AMD': 'Advanced Micro Devices Inc.',
        'INTC': 'Intel Corporation',
    }
    return names.get(symbol.upper(), symbol)


def get_ticker_info(symbol):
    """Get current price info for a single ticker with caching and real-time data"""
    # Check cache first
    current_time = time.time()
    if symbol in ticker_cache:
        cached_data, cache_time = ticker_cache[symbol]
        if current_time - cache_time < CACHE_DURATION:
            print(f"Using cached data for {symbol}")
            return cached_data
    
    # Try Alpha Vantage first for REAL-TIME data
    result = get_ticker_info_alpha_vantage(symbol)
    
    if result:
        # Cache the result
        ticker_cache[symbol] = (result, current_time)
        return result
    
    # Fallback to yfinance if Alpha Vantage fails
    try:
        time.sleep(0.2)
        ticker = yf.Ticker(symbol)
        info = ticker.info
        
        current_price = info.get('currentPrice') or info.get('regularMarketPrice', 0)
        previous_close = info.get('previousClose', current_price)
        change = current_price - previous_close if current_price else 0
        
        if current_price and current_price > 0:
            result = {
                'symbol': symbol,
                'name': info.get('shortName', symbol),
                'price': round(current_price, 2),
                'change': round(change, 2)
            }
            ticker_cache[symbol] = (result, current_time)
            print(f"Using yfinance data for {symbol}")
            return result
        
    except Exception as e:
        print(f"yfinance error for {symbol}: {e}")
    
    # Use fallback data as last resort
    if symbol in FALLBACK_DATA:
        print(f"[WARNING] Using fallback mock data for {symbol} (API limits reached)")
        return FALLBACK_DATA[symbol]
    
    return None


def search_yfinance_tickers(query):
    """
    Search for tickers matching the query
    Note: yfinance doesn't have a built-in search API, so we use a mapping approach
    """
    results = []
    query_upper = query.upper()
    
    # Common ticker mappings to avoid excessive API calls
    ticker_mapping = {
        'APPLE': 'AAPL', 'AAPL': 'AAPL',
        'TESLA': 'TSLA', 'TSLA': 'TSLA',
        'GOOGLE': 'GOOGL', 'GOOGL': 'GOOGL', 'GOOG': 'GOOG',
        'AMAZON': 'AMZN', 'AMZN': 'AMZN',
        'MICROSOFT': 'MSFT', 'MSFT': 'MSFT',
        'NVIDIA': 'NVDA', 'NVDA': 'NVDA',
        'META': 'META', 'FACEBOOK': 'META',
        'NETFLIX': 'NFLX', 'NFLX': 'NFLX',
        'AMD': 'AMD', 'INTEL': 'INTC', 'INTC': 'INTC',
        'BITCOIN': 'BTC-USD', 'BTC': 'BTC-USD',
        'ETHEREUM': 'ETH-USD', 'ETH': 'ETH-USD',
        'COINBASE': 'COIN', 'COIN': 'COIN',
        'WALMART': 'WMT', 'WMT': 'WMT',
        'JPMORGAN': 'JPM', 'JPM': 'JPM',
        'VISA': 'V', 'MASTERCARD': 'MA', 'MA': 'MA',
        'DISNEY': 'DIS', 'DIS': 'DIS',
        'NIKE': 'NKE', 'NKE': 'NKE',
        'STARBUCKS': 'SBUX', 'SBUX': 'SBUX',
        'PAYPAL': 'PYPL', 'PYPL': 'PYPL',
        'UBER': 'UBER', 'LYFT': 'LYFT',
        'SPOTIFY': 'SPOT', 'SPOT': 'SPOT',
    }
    
    # Find matching symbols
    matched_symbols = set()
    
    # Exact match
    if query_upper in ticker_mapping:
        matched_symbols.add(ticker_mapping[query_upper])
    
    # Partial match
    for name, symbol in ticker_mapping.items():
        if query_upper in name or name.startswith(query_upper):
            matched_symbols.add(symbol)
            if len(matched_symbols) >= 5:  # Limit to 5 results
                break
    
    # Fetch data for matched symbols
    for symbol in matched_symbols:
        ticker_data = get_ticker_info(symbol)
        if ticker_data and ticker_data['price'] > 0:
            results.append(ticker_data)
    
    return results


def parse_time_filter(time_filter):
    """Convert time filter to number of days"""
    filters = {
        '1d': 1,
        '1w': 7,
        '2w': 14,
        '1m': 30,
        '3m': 90,
        '6m': 180,
        '1y': 365,
        '3y': 1095,
        '5y': 1825
    }
    return filters.get(time_filter, 7)  # Default to 1 week


def analyze_sentiment_finbert(text):
    """
    Analyze sentiment using FinBERT model
    Returns: {'sentiment': 'positive'|'negative'|'neutral', 'score': float, 'scores': {}}
    """
    if not FINBERT_AVAILABLE:
        return None
    
    try:
        # Tokenize and get model output
        inputs = finbert_tokenizer(text, return_tensors="pt", truncation=True, max_length=512, padding=True)
        
        with torch.no_grad():
            outputs = finbert_model(**inputs)
            predictions = F.softmax(outputs.logits, dim=-1)
        
        # FinBERT outputs: [positive, negative, neutral]
        scores = predictions[0].tolist()
        sentiment_map = {0: 'positive', 1: 'negative', 2: 'neutral'}
        
        predicted_class = torch.argmax(predictions, dim=1).item()
        sentiment = sentiment_map[predicted_class]
        confidence = scores[predicted_class]
        
        return {
            'sentiment': sentiment,
            'confidence': round(confidence, 4),
            'scores': {
                'positive': round(scores[0], 4),
                'negative': round(scores[1], 4),
                'neutral': round(scores[2], 4)
            }
        }
    except Exception as e:
        print(f"FinBERT analysis error: {e}")
        return None


def fetch_alphavantage_news(symbol, time_filter):
    """Fetch news from Alpha Vantage News Sentiment API"""
    if not ALPHA_VANTAGE_KEY:
        return None
    
    try:
        url = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={symbol}&apikey={ALPHA_VANTAGE_KEY}&limit=50"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if 'feed' in data and data['feed']:
            news_items = []
            for idx, article in enumerate(data['feed'][:50]):
                news_items.append({
                    'id': f"{symbol}_av_{idx}",
                    'title': article.get('title', ''),
                    'source': article.get('source', 'Alpha Vantage'),
                    'publishedAt': article.get('time_published', ''),
                    'url': article.get('url', ''),
                    'summary': article.get('summary', '')[:500]
                })
            print(f"[OK] Alpha Vantage News: {len(news_items)} articles for {symbol}")
            return news_items
    except Exception as e:
        print(f"Alpha Vantage News error: {e}")
    return None


def fetch_finnhub_news(symbol, time_filter):
    """Fetch news from Finnhub API with fallback to second key"""
    keys = [FINNHUB_API_KEY, FINNHUB_API_KEY_2]
    
    for idx, key in enumerate(keys):
        if not key:
            continue
            
        try:
            days_back = parse_time_filter(time_filter)
            from_date = (datetime.now() - timedelta(days=days_back)).strftime('%Y-%m-%d')
            to_date = datetime.now().strftime('%Y-%m-%d')
            
            url = f"https://finnhub.io/api/v1/company-news?symbol={symbol}&from={from_date}&to={to_date}&token={key}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 429:
                print(f"Finnhub key {idx + 1} rate limited, trying next...")
                continue
                
            data = response.json()
            
            if isinstance(data, list) and data:
                news_items = []
                for article_idx, article in enumerate(data[:50]):
                    news_items.append({
                        'id': f"{symbol}_fh_{article_idx}",
                        'title': article.get('headline', ''),
                        'source': article.get('source', 'Finnhub'),
                        'publishedAt': datetime.fromtimestamp(article.get('datetime', 0)).isoformat(),
                        'url': article.get('url', ''),
                        'summary': article.get('summary', '')[:500]
                    })
                print(f"[OK] Finnhub key {idx + 1}: {len(news_items)} articles for {symbol}")
                return news_items
        except Exception as e:
            print(f"Finnhub key {idx + 1} error: {e}")
            continue
    
    return None


def fetch_newsapi_news(symbol, time_filter):
    """Fetch news from NewsAPI"""
    if not newsapi:
        return None
    
    try:
        days_back = min(parse_time_filter(time_filter), 30)
        from_date = (datetime.now() - timedelta(days=days_back)).strftime('%Y-%m-%d')
        
        # Get company name
        try:
            ticker = yf.Ticker(symbol)
            company_name = ticker.info.get('shortName', symbol)
        except:
            company_name = symbol
        
        articles = newsapi.get_everything(
            q=f"{symbol} OR {company_name}",
            from_param=from_date,
            language='en',
            sort_by='publishedAt',
            page_size=50
        )
        
        news_items = []
        for idx, article in enumerate(articles.get('articles', [])):
            news_items.append({
                'id': f"{symbol}_na_{idx}",
                'title': article['title'],
                'source': article['source']['name'],
                'publishedAt': article['publishedAt'],
                'url': article['url'],
                'summary': article.get('description', article['title'])[:500]
            })
        
        if news_items:
            print(f"[OK] NewsAPI: {len(news_items)} articles for {symbol}")
            return news_items
    except Exception as e:
        print(f"NewsAPI error: {e}")
    return None


def fetch_polygon_news(symbol, time_filter):
    """Fetch news from Polygon.io API"""
    if not POLYGON_API_KEY:
        return None
    
    try:
        url = f"https://api.polygon.io/v2/reference/news?ticker={symbol}&limit=50&apiKey={POLYGON_API_KEY}"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if 'results' in data and data['results']:
            news_items = []
            for idx, article in enumerate(data['results']):
                news_items.append({
                    'id': f"{symbol}_pg_{idx}",
                    'title': article.get('title', ''),
                    'source': article.get('publisher', {}).get('name', 'Polygon'),
                    'publishedAt': article.get('published_utc', ''),
                    'url': article.get('article_url', ''),
                    'summary': article.get('description', '')[:500]
                })
            print(f"✓ Polygon: {len(news_items)} articles for {symbol}")
            return news_items
    except Exception as e:
        print(f"Polygon error: {e}")
    return None


def fetch_newsdata_news(symbol, time_filter):
    """Fetch news from NewsData.io API"""
    if not NEWSDATA_API_KEY:
        return None
    
    try:
        url = f"https://newsdata.io/api/1/news?apikey={NEWSDATA_API_KEY}&q={symbol}&language=en"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if 'results' in data and data['results']:
            news_items = []
            for idx, article in enumerate(data['results'][:50]):
                news_items.append({
                    'id': f"{symbol}_nd_{idx}",
                    'title': article.get('title', ''),
                    'source': article.get('source_id', 'NewsData'),
                    'publishedAt': article.get('pubDate', ''),
                    'url': article.get('link', ''),
                    'summary': article.get('description', '')[:500]
                })
            print(f"[OK] NewsData: {len(news_items)} articles for {symbol}")
            return news_items
    except Exception as e:
        print(f"NewsData error: {e}")
    return None


def get_mock_news(symbol):
    """Generate mock news data for testing when API fails or is not configured"""
    company_names = {
        'AAPL': 'Apple',
        'TSLA': 'Tesla',
        'GOOGL': 'Google',
        'AMZN': 'Amazon',
        'MSFT': 'Microsoft',
        'NVDA': 'NVIDIA',
        'META': 'Meta',
        'NFLX': 'Netflix',
        'AMD': 'AMD',
        'INTC': 'Intel',
    }
    
    company = company_names.get(symbol, symbol)
    
    mock_articles = [
        {
            'id': f'{symbol}_mock_1',
            'title': f'{company} Reports Strong Q4 Earnings, Beats Expectations',
            'source': 'Financial Times',
            'publishedAt': (datetime.now() - timedelta(hours=2)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-earnings',
            'summary': f'{company} announced its Q4 earnings results today, surpassing analyst expectations with strong revenue growth and improved margins. The company attributed its success to increased demand and operational efficiencies.'
        },
        {
            'id': f'{symbol}_mock_2',
            'title': f'Analysts Upgrade {company} Stock to "Buy" Rating',
            'source': 'Bloomberg',
            'publishedAt': (datetime.now() - timedelta(hours=8)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-upgrade',
            'summary': f'Major investment banks have upgraded their rating on {company} stock following positive market trends and strong fundamentals. Analysts cite innovation and market expansion as key growth drivers.'
        },
        {
            'id': f'{symbol}_mock_3',
            'title': f'{company} Announces New Product Launch for 2026',
            'source': 'TechCrunch',
            'publishedAt': (datetime.now() - timedelta(hours=12)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-product',
            'summary': f'{company} unveiled plans for a groundbreaking new product line expected to launch in early 2026. The announcement has generated significant interest among investors and consumers alike.'
        },
        {
            'id': f'{symbol}_mock_4',
            'title': f'Market Outlook: {company} Positioned for Growth in Tech Sector',
            'source': 'CNBC',
            'publishedAt': (datetime.now() - timedelta(days=1)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-outlook',
            'summary': f'Industry experts predict continued growth for {company} as the tech sector shows resilience. Strong fundamentals and strategic partnerships position the company well for future expansion.'
        },
        {
            'id': f'{symbol}_mock_5',
            'title': f'{company} Expands International Operations',
            'source': 'Reuters',
            'publishedAt': (datetime.now() - timedelta(days=1, hours=6)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-expansion',
            'summary': f'{company} announced plans to expand its international presence with new facilities in emerging markets. The move is expected to drive revenue growth and increase market share globally.'
        },
        {
            'id': f'{symbol}_mock_6',
            'title': f'Investment Firms Increase Stakes in {company}',
            'source': 'Wall Street Journal',
            'publishedAt': (datetime.now() - timedelta(days=2)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-investment',
            'summary': f'Several major investment firms have increased their holdings in {company}, signaling confidence in the company\'s long-term prospects. Institutional ownership has reached new highs this quarter.'
        },
        {
            'id': f'{symbol}_mock_7',
            'title': f'{company} Announces Strategic Partnership with Industry Leader',
            'source': 'Business Insider',
            'publishedAt': (datetime.now() - timedelta(days=2, hours=12)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-partnership',
            'summary': f'{company} has formed a strategic partnership aimed at accelerating innovation and market penetration. The collaboration is expected to create synergies and drive mutual growth.'
        },
        {
            'id': f'{symbol}_mock_8',
            'title': f'Quarterly Review: {company} Shows Resilience Amid Market Volatility',
            'source': 'MarketWatch',
            'publishedAt': (datetime.now() - timedelta(days=3)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-review',
            'summary': f'Despite broader market challenges, {company} has demonstrated remarkable resilience with steady performance metrics and positive investor sentiment throughout the quarter.'
        },
        {
            'id': f'{symbol}_mock_9',
            'title': f'{company} Receives Industry Recognition for Innovation',
            'source': 'Forbes',
            'publishedAt': (datetime.now() - timedelta(days=4)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-award',
            'summary': f'{company} has been recognized with a prestigious industry award for its innovative approach and contributions to technological advancement. The company continues to lead in research and development.'
        },
        {
            'id': f'{symbol}_mock_10',
            'title': f'{company} Stock Reaches New 52-Week High',
            'source': 'Seeking Alpha',
            'publishedAt': (datetime.now() - timedelta(days=5)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-high',
            'summary': f'Shares of {company} have reached a new 52-week high, driven by strong earnings results and positive market sentiment. Analysts remain optimistic about continued upward momentum.'
        },
        {
            'id': f'{symbol}_mock_11',
            'title': f'CEO of {company} Discusses Future Strategy in Exclusive Interview',
            'source': 'The Economist',
            'publishedAt': (datetime.now() - timedelta(days=6)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-interview',
            'summary': f'In an exclusive interview, the CEO of {company} outlined the company\'s vision for sustainable growth, technological innovation, and commitment to stakeholder value creation over the next five years.'
        },
        {
            'id': f'{symbol}_mock_12',
            'title': f'{company} Reports Strong Consumer Demand in Holiday Quarter',
            'source': 'Associated Press',
            'publishedAt': (datetime.now() - timedelta(days=7)).isoformat(),
            'url': f'https://example.com/news/{symbol.lower()}-demand',
            'summary': f'{company} has reported exceptional consumer demand during the holiday shopping season, with sales figures exceeding projections. The strong performance bodes well for the upcoming fiscal year.'
        }
    ]
    
    return mock_articles


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'newsApiConfigured': newsapi is not None
    })


if __name__ == '__main__':
    print("Starting Sentify Backend Server...")
    print("Market data powered by yfinance")
    print(f"News API: {'Configured' if newsapi else 'Not configured'}")
    print("Server running on http://localhost:5000")
    app.run(debug=True, port=5000)
