"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Hexagon, Leaf } from 'lucide-react';
import { useUiStore } from '@/store/uiStore';

export const TopBar = () => {
  const { ecoMode, toggleEcoMode } = useUiStore();

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent('open-command-bar'));
  };

  return (
    <header className="h-16 w-full bg-black/50 backdrop-blur-md border-b border-cyan-900/50 flex items-center justify-between px-6 z-40 relative">
      <div className="flex items-center gap-3">
        <Hexagon className="text-cyan-500 w-6 h-6 animate-pulse" />
        <h1 className="text-cyan-100 font-mono font-semibold tracking-widest uppercase text-sm">Target Workspace</h1>
      </div>
      <div className="flex items-center gap-4">
        <div 
          onClick={handleSearchClick}
          className="relative flex items-center cursor-pointer group"
        >
          <Search className="absolute left-3 text-cyan-600 w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Press Cmd+K to search..."
            className="bg-black/50 border border-cyan-900/50 group-hover:border-cyan-700 rounded-md py-1.5 pl-9 pr-4 text-sm font-mono text-cyan-100 placeholder:text-cyan-800 focus:outline-none focus:border-cyan-500 w-64 transition-all pointer-events-none"
            readOnly
          />
        </div>

        {/* Eco-Astral Mode Toggle */}
        <button
          id="eco-astral-toggle"
          onClick={toggleEcoMode}
          title={ecoMode ? 'Disable Eco-Astral Mode' : 'Enable Eco-Astral Mode (Lag Fix)'}
          className={`relative p-2 rounded-md transition-all duration-300 ${
            ecoMode
              ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
              : 'text-cyan-600 hover:text-cyan-400 border border-transparent hover:border-cyan-800'
          }`}
        >
          <Leaf className="w-5 h-5" />
          {ecoMode && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </button>

        <button className="text-cyan-600 hover:text-cyan-400 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <Link 
          href="/settings"
          className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          title="System Config Settings"
        >
          <span className="text-cyan-400 text-xs font-mono select-none">OP</span>
        </Link>
      </div>
    </header>
  );
};
