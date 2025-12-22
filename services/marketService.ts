import { NewsItem, StockTicker } from "../types";

/**
 * Market Service - Real Data Integration
 * 
 * This service fetches real market data from the Python Flask backend.
 * Backend endpoints:
 * - GET /api/search?q={query}  -> Returns StockTicker[]
 * - GET /api/news?symbol={symbol}&range={timeFilter} -> Returns NewsItem[]
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const searchTickers = async (query: string): Promise<StockTicker[]> => {
  try {
    const url = `${API_BASE_URL}/api/search${query ? `?q=${encodeURIComponent(query)}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[MarketService] Error fetching tickers:', error);
    // Return empty array on error to gracefully handle failures
    return [];
  }
};

export const fetchCompanyNews = async (symbol: string, timeFilter: string): Promise<NewsItem[]> => {
  try {
    console.log(`[MarketService] Fetching news for ${symbol} range=${timeFilter}...`);
    
    const url = `${API_BASE_URL}/api/news?symbol=${encodeURIComponent(symbol)}&range=${timeFilter}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[MarketService] Error fetching news:', error);
    // Return empty array on error to gracefully handle failures
    return [];
  }
};