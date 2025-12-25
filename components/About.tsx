import React from 'react';
import { Brain, Cpu, Database, Globe, TrendingUp, Zap, Shield, BarChart2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-sentify-dark text-white pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 text-sentify-primary">
              <BarChart2 className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-sentify-primary to-sentify-accent bg-clip-text text-transparent">
            About Sentify
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            An advanced financial sentiment analysis system powered by dual AI models and real-time market data
          </p>
        </div>

        {/* Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-sentify-primary">Objectives</h2>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-sentify-primary flex-shrink-0 mt-1" />
                <span>Provide real-time sentiment analysis of financial news for any publicly listed company worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-sentify-primary flex-shrink-0 mt-1" />
                <span>Combine multiple AI models (FinBERT + Google Gemini) to deliver accurate sentiment predictions</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-sentify-primary flex-shrink-0 mt-1" />
                <span>Filter and analyze only relevant company-specific news to eliminate noise and improve accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-sentify-primary flex-shrink-0 mt-1" />
                <span>Enable investors to make data-driven decisions based on comprehensive sentiment metrics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-sentify-primary">Tech Stack</h2>
          
          {/* Frontend */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-sentify-accent flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              Frontend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React 19', desc: 'UI Framework' },
                { name: 'TypeScript 5.6', desc: 'Type Safety' },
                { name: 'Vite 6.4', desc: 'Build Tool' },
                { name: 'Tailwind CSS', desc: 'Styling' },
                { name: 'Recharts', desc: 'Data Visualization' },
                { name: 'Lucide Icons', desc: 'Icon Library' },
                { name: 'Google GenAI', desc: 'Gemini Integration' }
              ].map((tech) => (
                <div key={tech.name} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-sentify-primary/50 transition-all">
                  <p className="font-semibold text-white">{tech.name}</p>
                  <p className="text-sm text-slate-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-sentify-accent flex items-center gap-2">
              <Database className="w-6 h-6" />
              Backend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Python 3.13', desc: 'Runtime' },
                { name: 'Flask 3.0', desc: 'Web Framework' },
                { name: 'FinBERT', desc: 'Sentiment AI' },
                { name: 'Transformers', desc: 'Model Library' },
                { name: 'PyTorch', desc: 'ML Framework' },
                { name: 'yfinance', desc: 'Market Data' }
              ].map((tech) => (
                <div key={tech.name} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-sentify-primary/50 transition-all">
                  <p className="font-semibold text-white">{tech.name}</p>
                  <p className="text-sm text-slate-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* APIs */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sentify-accent flex items-center gap-2">
              <Globe className="w-6 h-6" />
              News APIs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Finnhub', desc: 'Primary News Source' },
                { name: 'Alpha Vantage', desc: 'Financial Data' },
                { name: 'NewsData.io', desc: 'Global News' },
                { name: 'NewsAPI', desc: 'News Aggregation' },
                { name: 'Google Gemini', desc: 'AI Analysis' }
              ].map((api) => (
                <div key={api.name} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-sentify-primary/50 transition-all">
                  <p className="font-semibold text-white">{api.name}</p>
                  <p className="text-sm text-slate-400">{api.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-sentify-primary">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-sentify-primary/50 transition-all">
              <Brain className="w-10 h-10 text-sentify-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dual-Model Analysis</h3>
              <p className="text-slate-400">Combines FinBERT and Google Gemini AI for accurate sentiment predictions with model agreement tracking</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-sentify-primary/50 transition-all">
              <Globe className="w-10 h-10 text-sentify-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Worldwide Search</h3>
              <p className="text-slate-400">Search and analyze any publicly listed company from global exchanges (US, Europe, Asia, etc.)</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-sentify-primary/50 transition-all">
              <Shield className="w-10 h-10 text-sentify-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Filtering</h3>
              <p className="text-slate-400">Relevance filtering ensures only company-specific news is analyzed, eliminating market noise</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-sentify-primary/50 transition-all">
              <BarChart2 className="w-10 h-10 text-sentify-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rich Visualization</h3>
              <p className="text-slate-400">Interactive charts, radar plots, and comprehensive metrics dashboard for deep insights</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-sentify-primary/50 transition-all">
              <TrendingUp className="w-10 h-10 text-sentify-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
              <p className="text-slate-400">Live market prices and up-to-date news articles with 5-minute caching for optimal performance</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-sentify-primary/50 transition-all">
              <Zap className="w-10 h-10 text-sentify-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-API Fallback</h3>
              <p className="text-slate-400">Intelligent fallback system across 5 news sources ensures 99%+ uptime and data availability</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-700/50">
          <p className="text-slate-400 mb-2">Developed by <a href="https://github.com/Tharul-J/Sentify_2.0" target="_blank" rel="noopener noreferrer" className="text-sentify-primary font-semibold hover:underline transition-all">@Tharul-J</a></p>
          <p className="text-sm text-slate-500">Sentify - Financial Sentiment Analysis System</p>
        </div>

      </div>
    </div>
  );
};
