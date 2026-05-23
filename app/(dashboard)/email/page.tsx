"use client";
import React from 'react';
import { BreachPanel } from '@/components/panels/BreachPanel';
import { ThreatScorePanel } from '@/components/panels/ThreatScorePanel';
import { useScanStore } from '@/store/scanStore';
import { Mail } from 'lucide-react';

export default function EmailPage() {
  const { activeScan } = useScanStore();
  
  return (
    <div className="space-y-6 animate-in fade-in max-w-7xl mx-auto pt-20 pb-12">
      <div className="flex items-center space-x-3 border-b border-cyan-900/50 pb-4">
        <div className="p-2 bg-cyan-950/30 rounded border border-cyan-500/30 text-cyan-400">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-mono font-bold text-white tracking-wider">
            {activeScan?.type === 'email' ? activeScan.target : 'EMAIL_INTELLIGENCE'}
          </h1>
          <p className="text-sm text-cyan-600/80 font-mono">Real-time email OSINT and breach monitoring</p>
        </div>
      </div>
      
      {!activeScan || activeScan.type !== 'email' ? (
        <div className="bg-black/50 border border-cyan-900/30 p-8 rounded text-center">
          <span className="text-cyan-700 font-mono text-sm italic">Enter an email target in the Global Search to begin. Email scanning module standing by...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Show hunter results if we add a HunterPanel later. For now, BreachPanel is sufficient! */}
            <BreachPanel />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ThreatScorePanel />
          </div>
        </div>
      )}
    </div>
  );
}
