import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { StockSelector } from './components/StockSelector';
import { Dashboard } from './components/Dashboard';
import { AnalysisConfigModal, AnalysisConfig } from './components/AnalysisConfigModal';
import { StockTicker } from './types';

function App() {
  // Simple State-based routing for Vibe Coding ease
  const [view, setView] = useState<'hero' | 'selector' | 'config' | 'dashboard'>('hero');
  const [selectedTicker, setSelectedTicker] = useState<StockTicker | null>(null);
  const [analysisConfig, setAnalysisConfig] = useState<AnalysisConfig | null>(null);

  const handleStart = () => {
    setView('selector');
  };

  const handleSelectTicker = (ticker: StockTicker) => {
    setSelectedTicker(ticker);
    setView('config');
  };

  const handleAnalyze = (config: AnalysisConfig) => {
    setAnalysisConfig(config);
    setView('dashboard');
  };

  const handleCancelConfig = () => {
    setView('selector');
    setSelectedTicker(null);
  };

  const handleBack = () => {
    setView('selector');
    setSelectedTicker(null);
    setAnalysisConfig(null);
  };

  return (
    <div className="font-sans antialiased">
      {view === 'hero' && <Hero onStart={handleStart} />}
      {view === 'selector' && <StockSelector onSelect={handleSelectTicker} />}
      {view === 'config' && selectedTicker && (
        <AnalysisConfigModal 
          ticker={selectedTicker} 
          onAnalyze={handleAnalyze}
          onCancel={handleCancelConfig}
        />
      )}
      {view === 'dashboard' && selectedTicker && analysisConfig && (
        <Dashboard 
          ticker={selectedTicker} 
          config={analysisConfig}
          onBack={handleBack}
          onChangeConfig={() => setView('config')}
        />
      )}
    </div>
  );
}

export default App;
