import React from 'react';
import { ArrowRight, BarChart2, TrendingUp, Brain, Globe } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: 'dashboard' | 'about') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-sentify-dark text-white pt-16">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[75%] h-[75%] bg-emerald-900/40 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute top-[40%] -right-[10%] w-[65%] h-[75%] bg-teal-900/30 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[55%] h-[55%] bg-cyan-900/20 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-[20%] left-[15%] w-4 h-4 bg-sentify-primary/60 rounded-full animate-float-particle" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[60%] left-[80%] w-5 h-5 bg-emerald-400/40 rounded-full animate-float-particle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[30%] right-[25%] w-4 h-4 bg-teal-400/50 rounded-full animate-float-particle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[25%] left-[70%] w-4 h-4 bg-cyan-400/60 rounded-full animate-float-particle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[70%] left-[10%] w-6 h-6 bg-emerald-500/30 rounded-full animate-float-particle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[45%] right-[15%] w-4 h-4 bg-sentify-primary/50 rounded-full animate-float-particle" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Twinkling Stars */}
        <div className="absolute top-[10%] left-[30%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[25%] right-[40%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-[30%] left-[50%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute top-[80%] right-[60%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2.1s' }}></div>
        <div className="absolute top-[50%] left-[25%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.2s' }}></div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <div className="flex justify-center mb-8 animate-fade-in">
           <div className="flex items-center gap-2 text-sentify-primary mb-4">
              <BarChart2 className="w-12 h-12 animate-bounce-slow" />
              <span className="text-2xl font-bold tracking-tight text-white animate-slide-in-right">Sentify</span>
           </div>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-3 mb-8">
          <div className="w-3 h-3 bg-sentify-primary rounded-full animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-sentify-primary rounded-full animate-pulse-glow" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 bg-sentify-primary rounded-full animate-pulse-glow" style={{ animationDelay: '0.6s' }}></div>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl animate-gradient bg-gradient-to-r from-white via-sentify-primary to-white bg-clip-text text-transparent bg-[length:200%_auto]">
          SENTIFY
        </h1>
        
        <p className="text-xl md:text-2xl text-sentify-accent/80 font-light tracking-widest uppercase mb-12 animate-fade-in-up">
          Financial Sentiment Analysis System
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-sentify-primary/50 transition-all animate-float" style={{ animationDelay: '0s' }}>
            <TrendingUp className="w-8 h-8 text-sentify-primary mx-auto mb-2" />
            <p className="text-sm text-slate-300">Real-time Market Analysis</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-sentify-primary/50 transition-all animate-float" style={{ animationDelay: '0.2s' }}>
            <Brain className="w-8 h-8 text-sentify-primary mx-auto mb-2" />
            <p className="text-sm text-slate-300">Dual AI Model System</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-sentify-primary/50 transition-all animate-float" style={{ animationDelay: '0.4s' }}>
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
