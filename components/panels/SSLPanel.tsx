import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Lock, ShieldCheck } from 'lucide-react';

export const SSLPanel = () => {
  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Lock className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">SSL/TLS Certificate</h2>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-cyan-950/50 border border-cyan-800 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-cyan-600">Issuer</span>
            <span className="text-cyan-300">Let's Encrypt Authority X3</span>
          </div>
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-cyan-600">Valid From</span>
            <span className="text-cyan-300">2023-10-01</span>
          </div>
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-cyan-600">Valid To</span>
            <span className="text-emerald-400">2024-01-01 (45 days left)</span>
          </div>
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-cyan-600">Protocol</span>
            <span className="text-cyan-300">TLS 1.3</span>
          </div>
        </div>
      </div>
    </HolographicCard>
  );
};
