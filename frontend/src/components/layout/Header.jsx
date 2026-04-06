// src/components/layout/Header.jsx
import React from 'react';
import { Waves, Activity, ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="max-w-6xl mx-auto bg-climate-card backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between z-50">
      <div className="flex items-center space-x-4 text-climate-accent mb-4 md:mb-0">
        <div className="p-2.5 bg-climate-accent/10 rounded-full animate-pulse-glow border border-climate-accent/20">
          <Waves className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-widest uppercase drop-shadow-md">Flood<span className="text-climate-accent">Guard</span> AI</h1>
          <p className="text-[10px] text-climate-muted font-bold tracking-[0.2em] uppercase">Predictive Risk Engine</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-xs font-semibold text-climate-text bg-black/40 px-4 py-2 rounded-full border border-white/5 shadow-inner">
          <Activity className="w-3.5 h-3.5 text-green-400" />
          <span>System Online</span>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-climate-text bg-black/40 px-4 py-2 rounded-full border border-white/5 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Models Synced</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-climate-accent/50 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.3)] p-[2px]">
          <div className="w-full h-full bg-gradient-to-tr from-climate-accent to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AR</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
