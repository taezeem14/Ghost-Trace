"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { RadioTower } from 'lucide-react';

export const ThreatFeedOverview = () => {
  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <RadioTower className="text-cyan-400 w-5 h-5 animate-pulse" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Global Threat Intel Feed</h2>
      </div>
      
      <div className="flex flex-col gap-3 font-mono text-xs">
        <div className="flex gap-4 items-start border-l-2 border-red-500 pl-3 py-1 bg-red-950/10 hover:bg-red-950/20 transition-colors">
          <span className="text-cyan-600 shrink-0">10:42 AM</span>
          <p className="text-cyan-300">New high-severity CVE identified in Ivanti Connect Secure VPNs.</p>
        </div>
        <div className="flex gap-4 items-start border-l-2 border-amber-500 pl-3 py-1 bg-amber-950/10 hover:bg-amber-950/20 transition-colors">
          <span className="text-cyan-600 shrink-0">09:15 AM</span>
          <p className="text-cyan-300">Increased scanning activity detected originating from ASN 14466.</p>
        </div>
        <div className="flex gap-4 items-start border-l-2 border-cyan-500 pl-3 py-1 bg-cyan-950/10 hover:bg-cyan-950/20 transition-colors">
          <span className="text-cyan-600 shrink-0">08:00 AM</span>
          <p className="text-cyan-300">System baseline updated. Threat signatures downloaded successfully.</p>
        </div>
      </div>
    </HolographicCard>
  );
};
