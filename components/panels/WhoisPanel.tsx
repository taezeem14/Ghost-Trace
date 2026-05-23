"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { User, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { useScanStore } from '@/store/scanStore';

export const WhoisPanel = () => {
  const { scanResults, activeScan } = useScanStore();
  const whois = scanResults?.whois;
  const isLoading = activeScan?.status === 'scanning';

  if (!whois && !isLoading) return null;

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <User className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">WHOIS Record</h2>
      </div>
      
      {isLoading && !whois ? (
        <div className="text-cyan-600 font-mono text-xs animate-pulse">Fetching WHOIS data...</div>
      ) : whois?.error ? (
         <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
           <AlertCircle className="w-4 h-4" /> {whois.error}
         </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-cyan-600">Registrar</span>
            <span className="text-cyan-300 break-all">{whois?.data?.registrar || 'Unknown'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-cyan-600">Registered On</span>
            <div className="flex items-center gap-1 text-cyan-300">
              <Calendar className="w-3 h-3" /> {whois?.data?.creationDate?.substring(0, 10) || 'Unknown'}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-cyan-600">Expires On</span>
            <div className="flex items-center gap-1 text-cyan-300">
              <Calendar className="w-3 h-3" /> {whois?.data?.expirationDate?.substring(0, 10) || 'Unknown'}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-cyan-600">Registrant Country</span>
            <div className="flex items-center gap-1 text-cyan-300">
              <MapPin className="w-3 h-3" /> {whois?.data?.registrantCountry || 'Unknown'}
            </div>
          </div>
        </div>
      )}
    </HolographicCard>
  );
};
