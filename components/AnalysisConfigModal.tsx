import React, { useState } from 'react';
import { X, Clock, Brain, Sparkles } from 'lucide-react';
import { StockTicker } from '../types';

interface AnalysisConfigModalProps {
  ticker: StockTicker;
  onAnalyze: (config: AnalysisConfig) => void;
  onCancel: () => void;
}

export interface AnalysisConfig {
  timeRange: string;
  useGemini: boolean;
  useFinBERT: boolean;
}

const TIME_RANGES = [
  { value: '1d', label: '24 Hours' },
  { value: '1w', label: '1 Week' },
  { value: '2w', label: '2 Weeks' },
  { value: '1m', label: '1 Month' },
  { value: '3m', label: '3 Months' },
  { value: '6m', label: '6 Months' },
  { value: '1y', label: '1 Year' },
  { value: '3y', label: '3 Years' },
  { value: '5y', label: '5 Years' },
];

export const AnalysisConfigModal: React.FC<AnalysisConfigModalProps> = ({ ticker, onAnalyze, onCancel }) => {
  const [timeRange, setTimeRange] = useState('1w');
  const [useGemini, setUseGemini] = useState(true);
  const [useFinBERT, setUseFinBERT] = useState(false);

  const handleAnalyze = () => {
    if (!useGemini && !useFinBERT) {
      alert('Please select at least one analysis model');
      return;
    }
    onAnalyze({ timeRange, useGemini, useFinBERT });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-20">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-2xl w-full shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Configure Analysis</h2>
            <p className="text-slate-400 text-sm mt-1">
              {ticker.name} ({ticker.symbol})
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Time Range Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-sentify-primary" />
              <label className="text-sm font-semibold text-white">Time Period</label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TIME_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range.value
                      ? 'bg-sentify-primary text-white shadow-lg shadow-sentify-primary/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-sentify-primary" />
              <label className="text-sm font-semibold text-white">AI Models</label>
              <span className="text-xs text-slate-500">(Select at least one)</span>
            </div>
            
            <div className="space-y-3">
              {/* Google Gemini */}
              <label className="flex items-start gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700 cursor-pointer hover:border-sentify-primary transition-colors">
                <input
                  type="checkbox"
                  checked={useGemini}
                  onChange={(e) => setUseGemini(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-600 text-sentify-primary focus:ring-sentify-primary focus:ring-offset-slate-900"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-white">Google Gemini</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">Advanced</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    State-of-the-art LLM with deep contextual understanding and nuanced sentiment analysis
                  </p>
                </div>
              </label>

              {/* FinBERT */}
              <label className="flex items-start gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700 cursor-pointer hover:border-sentify-primary transition-colors">
                <input
                  type="checkbox"
                  checked={useFinBERT}
                  onChange={(e) => setUseFinBERT(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-600 text-sentify-primary focus:ring-sentify-primary focus:ring-offset-slate-900"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-white">FinBERT</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">Financial</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Specialized BERT model trained on financial news for domain-specific sentiment detection
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-800">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAnalyze}
            className="px-6 py-2.5 bg-sentify-primary hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-sentify-primary/30 hover:shadow-sentify-primary/50"
          >
            Analyze Sentiment
          </button>
        </div>
      </div>
    </div>
  );
};
