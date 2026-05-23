"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Database, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';
import { useScanStore } from '@/store/scanStore';

export const BreachPanel = () => {
  const { scanResults, activeScan } = useScanStore();
  const hibp = scanResults?.hibp;
  const isLoading = activeScan?.status === 'scanning';

  if (!hibp && !isLoading) return null;

  const breaches = Array.isArray(hibp?.data) ? hibp.data : [];
  const hasBreaches = breaches.length > 0;

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Database className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Breach Data</h2>
      </div>
      
      {isLoading && !hibp ? (
        <div className="text-cyan-600 font-mono text-xs animate-pulse">Scanning breach databases...</div>
      ) : hibp?.error ? (
         <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
           <AlertCircle className="w-4 h-4" /> {hibp.error}
         </div>
      ) : (
        <>
          {hasBreaches ? (
            <div className="flex items-center gap-3 p-2 bg-red-950/30 border border-red-900/50 rounded text-red-400 font-mono text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Target found in {breaches.length} known data breaches.</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-2 bg-emerald-950/30 border border-emerald-900/50 rounded text-emerald-400 font-mono text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>No known breaches found. Target appears clean.</span>
            </div>
          )}
          
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {breaches.map((b: any, i: number) => (
              <div key={i} className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30 font-mono text-xs hover:border-cyan-500/50 transition-colors">
                <span className="text-cyan-300 font-semibold">{b.Title || b.Name}</span>
                <div className="flex items-center gap-3 text-cyan-600">
                  <span>{b.PwnCount ? `${(b.PwnCount / 1000000).toFixed(1)}M records` : 'Unknown records'}</span>
                  <span>{b.BreachDate || 'Unknown Date'}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </HolographicCard>
  );
};
