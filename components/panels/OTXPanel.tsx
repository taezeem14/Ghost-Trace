"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Eye } from 'lucide-react';

export const OTXPanel = () => {
  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Eye className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">AlienVault OTX Pulses</h2>
      </div>
      <div className="font-mono text-xs text-cyan-600 italic">
        No active threat pulses detected for this target.
      </div>
    </HolographicCard>
  );
};
