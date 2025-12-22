import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-sentify-dark text-white">
      {/* Background Gradients to match the PDF vibe */}
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

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-sentify-primary text-sentify-primary rounded-full hover:bg-sentify-primary hover:text-white transition-all duration-300 ease-out"
        >
          <span className="font-semibold tracking-wider">GROUP 7 - LAUNCH APP</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-8 text-sentify-muted text-sm">
        Powered by FinBERT & Gemini AI
      </div>
    </div>
  );
};
