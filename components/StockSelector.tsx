import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { StockTicker } from '../types';
import { searchTickers } from '../services/marketService';

interface StockSelectorProps {
  onSelect: (ticker: StockTicker) => void;
}

export const StockSelector: React.FC<StockSelectorProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockTicker[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length >= 1) {  // Changed from > 1 to >= 1 to search immediately
      setSearching(true);
      const data = await searchTickers(val);
      setResults(data);
      setSearching(false);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-sentify-dark flex flex-col items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Analyze a Company</h2>
        <p className="text-slate-400 text-center mb-8">Search for a ticker symbol to begin sentiment analysis.</p>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-sentify-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-xl leading-5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sentify-primary focus:border-transparent transition-all shadow-2xl"
            placeholder="Search (e.g. AAPL, TSLA)..."
            value={query}
            onChange={handleSearch}
            autoFocus
          />
          {searching && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="h-4 w-4 border-2 border-sentify-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden divide-y divide-slate-800">
            {results.map((ticker) => (
              <button
                key={ticker.symbol}
                onClick={() => onSelect(ticker)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors text-left"
              >
                <div>
                  <span className="block text-lg font-bold text-white">{ticker.symbol}</span>
                  <span className="block text-sm text-slate-400">{ticker.name}</span>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-mono text-slate-300">${ticker.price.toFixed(2)}</span>
                  <span className={`text-xs font-bold ${ticker.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {ticker.change >= 0 ? '+' : ''}{ticker.change}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Quick Links */}
        {results.length === 0 && (
           <div className="mt-8">
             <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 font-semibold text-center">Popular Tickers</p>
             <div className="flex flex-wrap gap-2 justify-center">
               {['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN'].map(sym => (
                 <button 
                  key={sym} 
                  onClick={async () => {
                     // Quick hack to simulate selection from popular list
                     const res = await searchTickers(sym);
                     if(res[0]) onSelect(res[0]);
                  }}
                  className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 transition-all hover:border-sentify-primary"
                 >
                   {sym}
                 </button>
               ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
};
