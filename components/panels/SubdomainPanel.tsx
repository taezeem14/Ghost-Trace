"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Server } from 'lucide-react';
import { useScanStore } from '@/store/scanStore';

export const SubdomainPanel = () => {
  const { scanResults, activeScan } = useScanStore();
  const subdomains = scanResults?.subdomains;
  const isLoading = activeScan?.status === 'scanning';

  if (!subdomains && !isLoading) return null;

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Server className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Subdomains (crt.sh / SecurityTrails)</h2>
      </div>
      
      {isLoading && !subdomains ? (
         <div className="text-cyan-600 font-mono text-xs animate-pulse">Enumerating subdomains...</div>
      ) : (
        <div className="font-mono text-xs text-cyan-500">
          Subdomain module active. Data enumeration completed.
        </div>
      )}
    </HolographicCard>
  );
};
