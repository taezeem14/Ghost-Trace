import React from 'react';
import { CheckCircle2, Activity, Wifi } from 'lucide-react';

export const StatusBar = () => {
  return (
    <footer className="h-8 w-full bg-black/80 border-t border-cyan-900/50 flex items-center justify-between px-4 font-mono text-[10px] text-cyan-600 uppercase tracking-widest relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>System Online</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-cyan-700" />
          <span>Latency: 12ms</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>Shodan API</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>VirusTotal API</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-emerald-500" />
          <span>Proxy Active</span>
        </div>
      </div>
    </footer>
  );
};
