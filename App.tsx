import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { About } from './components/About';
import { StockSelector } from './components/StockSelector';
import { Dashboard } from './components/Dashboard';
import { AnalysisConfigModal, AnalysisConfig } from './components/AnalysisConfigModal';
import { StockTicker } from './types';

function App() {
  // Main navigation state
  const [mainView, setMainView] = useState<'home' | 'dashboard' | 'about'>('home');
  
  // Dashboard sub-navigation state
  const [dashboardView, setDashboardView] = useState<'selector' | 'config' | 'analysis'>('selector');
  const [selectedTicker, setSelectedTicker] = useState<StockTicker | null>(null);
  const [analysisConfig, setAnalysisConfig] = useState<AnalysisConfig | null>(null);

  const handleNavigate = (view: 'home' | 'dashboard' | 'about') => {
    setMainView(view);
    // Reset dashboard state when navigating away
    if (view !== 'dashboard') {
      setDashboardView('selector');
      setSelectedTicker(null);
      setAnalysisConfig(null);
    }
  };

  const handleSelectTicker = (ticker: StockTicker) => {
    setSelectedTicker(ticker);
    setDashboardView('config');
  };

  const handleAnalyze = (config: AnalysisConfig) => {
    setAnalysisConfig(config);
    setDashboardView('analysis');
  };

  const handleCancelConfig = () => {
    setDashboardView('selector');
    setSelectedTicker(null);
  };

  const handleBack = () => {
    setDashboardView('selector');
    setSelectedTicker(null);
    setAnalysisConfig(null);
  };

  return (
    <div className="font-sans antialiased">
      {/* Show navigation bar on all pages except when in analysis view */}
      {!(mainView === 'dashboard' && dashboardView === 'analysis') && (
        <Navigation currentView={mainView} onNavigate={handleNavigate} />
      )}

      {/* Home Page */}
      {mainView === 'home' && <Home onNavigate={handleNavigate} />}

      {/* About Page */}
      {mainView === 'about' && <About />}

      {/* Dashboard Section */}
      {mainView === 'dashboard' && (
        <>
          {dashboardView === 'selector' && <StockSelector onSelect={handleSelectTicker} />}
          {dashboardView === 'config' && selectedTicker && (
            <AnalysisConfigModal 
              ticker={selectedTicker} 
              onAnalyze={handleAnalyze}
              onCancel={handleCancelConfig}
            />
          )}
          {dashboardView === 'analysis' && selectedTicker && analysisConfig && (
            <Dashboard 
              ticker={selectedTicker} 
              config={analysisConfig}
              onBack={handleBack}
              onChangeConfig={() => setDashboardView('config')}
              onHome={() => handleNavigate('home')}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
