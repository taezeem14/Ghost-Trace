import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Network } from 'lucide-react';

export const ASNPanel = () => {
  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Network className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">ASN Info</h2>
      </div>
      <div className="flex flex-col gap-3 font-mono text-xs">
        <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
          <span className="text-cyan-600">ASN</span>
          <span className="text-cyan-300 font-bold">AS13335</span>
        </div>
        <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
          <span className="text-cyan-600">Organization</span>
          <span className="text-cyan-300">Cloudflare, Inc.</span>
        </div>
        <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
          <span className="text-cyan-600">Route</span>
          <span className="text-cyan-300">104.16.0.0/12</span>
        </div>
      </div>
    </HolographicCard>
  );
};
