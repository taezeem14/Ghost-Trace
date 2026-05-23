import React from 'react';
import { Search, Bell, Hexagon } from 'lucide-react';

export const TopBar = () => {
  return (
    <header className="h-16 w-full bg-black/50 backdrop-blur-md border-b border-cyan-900/50 flex items-center justify-between px-6 pl-20 z-40 fixed top-0">
      <div className="flex items-center gap-3">
        <Hexagon className="text-cyan-500 w-6 h-6" />
        <h1 className="text-cyan-100 font-mono font-semibold tracking-widest uppercase text-sm">Target Workspace</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-cyan-600 w-4 h-4" />
          <input
            type="text"
            placeholder="Press Cmd+K to search..."
            className="bg-black/50 border border-cyan-900/50 rounded-md py-1.5 pl-9 pr-4 text-sm font-mono text-cyan-100 placeholder:text-cyan-800 focus:outline-none focus:border-cyan-500 w-64 transition-all"
            readOnly
          />
        </div>
        <button className="text-cyan-600 hover:text-cyan-400 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center">
          <span className="text-cyan-400 text-xs font-mono">OP</span>
        </div>
      </div>
    </header>
  );
};
