import React from 'react';
import { BarChart2 } from 'lucide-react';

interface NavigationProps {
  currentView: 'home' | 'dashboard' | 'about';
  onNavigate: (view: 'home' | 'dashboard' | 'about') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home' as const, label: 'HOME' },
    { id: 'dashboard' as const, label: 'DASHBOARD' },
    { id: 'about' as const, label: 'ABOUT' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-teal-900/95 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - acts as home button */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-sentify-primary hover:text-sentify-accent transition-colors group"
          >
            <BarChart2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-white">Sentify</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-6 py-2 text-sm font-semibold tracking-wider transition-all duration-200 ${
                  currentView === item.id
                    ? 'text-sentify-primary border-b-2 border-sentify-primary'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
