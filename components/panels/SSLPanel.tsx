"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Lock, ShieldCheck, ShieldAlert, AlertCircle } from 'lucide-react';
import { useScanStore } from '@/store/scanStore';

export const SSLPanel = () => {
  const { scanResults, activeScan } = useScanStore();
  const ssl = scanResults?.ssl;
  const isLoading = activeScan?.status === 'scanning';

  if (!ssl && !isLoading) return null;

  const data = ssl?.data;
  const isValid = data?.valid;

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Lock className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">SSL/TLS Certificate</h2>
      </div>
      
      {isLoading && !ssl ? (
        <div className="text-cyan-600 font-mono text-xs animate-pulse">Checking SSL certificate...</div>
      ) : ssl?.error ? (
         <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
           <AlertCircle className="w-4 h-4" /> {ssl.error}
         </div>
      ) : (
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${isValid ? 'bg-emerald-950/50 border-emerald-800' : 'bg-red-950/50 border-red-800'}`}>
            {isValid ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-red-400" />
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-cyan-600">Valid From</span>
              <span className="text-cyan-300">{data?.validFrom || 'Unknown'}</span>
            </div>
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-cyan-600">Valid To</span>
              <span className={data?.daysRemaining < 30 ? "text-amber-400" : "text-emerald-400"}>
                {data?.validTo || 'Unknown'} ({data?.daysRemaining || 0} days left)
              </span>
            </div>
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-cyan-600">Status</span>
              <span className={isValid ? "text-emerald-400" : "text-red-400"}>
                {isValid ? 'Valid' : 'Invalid / Expired'}
              </span>
            </div>
          </div>
        </div>
      )}
    </HolographicCard>
  );
};
