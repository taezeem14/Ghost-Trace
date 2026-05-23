import React from 'react';
import { Shield, Globe, Activity, Lock, Database, Server, Crosshair, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Crosshair, label: 'Reconnaissance', active: true },
  { icon: Globe, label: 'DNS Intelligence' },
  { icon: Shield, label: 'Threat Analysis' },
  { icon: Database, label: 'Breach Data' },
  { icon: Lock, label: 'SSL/TLS' },
  { icon: Server, label: 'Infrastructure' },
];

export const Sidebar = () => {
  return (
    <aside className="w-16 hover:w-64 transition-all duration-300 h-screen bg-black/80 backdrop-blur-xl border-r border-cyan-900/50 flex flex-col items-start overflow-hidden group z-50 fixed left-0 top-0">
      <div className="h-16 w-full flex items-center justify-center border-b border-cyan-900/50 group-hover:justify-start group-hover:px-4">
        <Terminal className="text-cyan-400 w-6 h-6 shrink-0" />
        <span className="text-cyan-400 font-mono font-bold ml-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GhostTrace OSINT</span>
      </div>
      <nav className="flex-1 w-full py-4 flex flex-col gap-2">
        {NAV_ITEMS.map((item, idx) => (
          <button key={idx} className={`w-full flex items-center px-4 py-3 hover:bg-cyan-950/30 transition-colors ${item.active ? 'border-l-2 border-cyan-400 bg-cyan-950/20' : 'border-l-2 border-transparent'}`}>
            <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
            <span className={`ml-4 font-mono text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${item.active ? 'text-cyan-400' : 'text-slate-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
