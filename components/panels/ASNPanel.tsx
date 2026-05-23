"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Network, AlertCircle } from 'lucide-react';
import { useScanStore } from '@/store/scanStore';

export const ASNPanel = () => {
  const { scanResults, activeScan } = useScanStore();
  const asn = scanResults?.asn;
  const isLoading = activeScan?.status === 'scanning';

  if (!asn && !isLoading) return null;

  // bgpview returns data inside data.data
  const prefixes = asn?.data?.data?.prefixes || [];
  const firstPrefix = prefixes.length > 0 ? prefixes[0] : null;

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Network className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">ASN Info</h2>
      </div>
      
      {isLoading && !asn ? (
        <div className="text-cyan-600 font-mono text-xs animate-pulse">Querying BGP routing tables...</div>
      ) : asn?.error ? (
         <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
           <AlertCircle className="w-4 h-4" /> {asn.error}
         </div>
      ) : firstPrefix ? (
        <div className="flex flex-col gap-3 font-mono text-xs">
          <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
            <span className="text-cyan-600">ASN</span>
            <span className="text-cyan-300 font-bold">AS{firstPrefix.asn?.asn || 'Unknown'}</span>
          </div>
          <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
            <span className="text-cyan-600">Organization</span>
            <span className="text-cyan-300 truncate pl-4" title={firstPrefix.asn?.name || firstPrefix.asn?.description}>{firstPrefix.asn?.name || firstPrefix.asn?.description || 'Unknown'}</span>
          </div>
          <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
            <span className="text-cyan-600">Route</span>
            <span className="text-cyan-300">{firstPrefix.prefix || 'Unknown'}</span>
          </div>
          <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30">
            <span className="text-cyan-600">Country Code</span>
            <span className="text-cyan-300">{firstPrefix.asn?.country_code || 'Unknown'}</span>
          </div>
        </div>
      ) : (
        <div className="text-cyan-600 font-mono text-xs">No ASN data found for this target.</div>
      )}
    </HolographicCard>
  );
};
