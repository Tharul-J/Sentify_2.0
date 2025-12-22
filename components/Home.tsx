import React from 'react';
import { ArrowRight, BarChart2, TrendingUp, Brain, Globe } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: 'dashboard' | 'about') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-sentify-dark text-white pt-16">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-emerald-900/40 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[60%] bg-teal-900/30 blur-[100px] rounded-full"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <div className="flex justify-center mb-8">
           <div className="flex items-center gap-2 text-sentify-primary mb-4">
              <BarChart2 className="w-12 h-12" />
              <span className="text-2xl font-bold tracking-tight text-white">Sentify</span>
           </div>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-3 mb-8">
          <div className="w-3 h-3 bg-sentify-primary rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-sentify-primary rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-sentify-primary rounded-full animate-pulse delay-300"></div>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
          SENTIFY
        </h1>
        
        <p className="text-xl md:text-2xl text-sentify-accent/80 font-light tracking-widest uppercase mb-12">
          Financial Sentiment Analysis System
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-sentify-primary/50 transition-all">
            <TrendingUp className="w-8 h-8 text-sentify-primary mx-auto mb-2" />
            <p className="text-sm text-slate-300">Real-time Market Analysis</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-sentify-primary/50 transition-all">
            <Brain className="w-8 h-8 text-sentify-primary mx-auto mb-2" />
            <p className="text-sm text-slate-300">Dual AI Model System</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-sentify-primary/50 transition-all">
            <Globe className="w-8 h-8 text-sentify-primary mx-auto mb-2" />
            <p className="text-sm text-slate-300">Worldwide Company Search</p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('dashboard')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-sentify-primary text-sentify-primary rounded-full hover:bg-sentify-primary hover:text-white transition-all duration-300 ease-out"
        >
          <span className="font-semibold tracking-wider">Get started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-8 text-sentify-muted text-sm">
        Powered by FinBERT & Gemini AI
      </div>
    </div>
  );
};
