'use client';

import React, { useState } from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Globe, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScanStore } from '@/store/scanStore';

const TABS = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA'];

export const DNSPanel = () => {
  const [activeTab, setActiveTab] = useState('A');
  const { scanResults, activeScan } = useScanStore();
  const dns = scanResults?.dns;
  const isLoading = activeScan?.status === 'scanning';

  if (!dns && !isLoading) return null;
  const records = dns?.data || {};

  const renderRecordValue = (val: any) => {
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(' ');
    if (val?.exchange) return `${val.priority} ${val.exchange}`;
    if (val?.nsname) return `${val.nsname} (admin: ${val.hostmaster})`;
    return JSON.stringify(val);
  };

  const currentRecords = records[activeTab];

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Globe className="text-cyan-400 w-5 h-5" />
          <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">DNS Records</h2>
        </div>
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-cyan-900/30 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                activeTab === tab ? 'bg-cyan-900 text-cyan-100' : 'text-cyan-600 hover:text-cyan-300'
              }`}
            >
              {tab}
              {records[tab] && (
                <span className="ml-1 text-[9px] bg-cyan-900/50 px-1 rounded">
                  {Array.isArray(records[tab]) ? records[tab].length : 1}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-black/40 border border-cyan-900/30 rounded p-3 min-h-[100px] overflow-hidden relative">
        {isLoading && !dns ? (
          <div className="text-cyan-600 font-mono text-xs animate-pulse">Resolving DNS records...</div>
        ) : dns?.error ? (
           <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
             <AlertCircle className="w-4 h-4" /> {dns.error}
           </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="font-mono text-xs text-cyan-300 flex flex-col gap-2"
            >
              <div className="grid grid-cols-12 gap-2 text-cyan-700 mb-1 border-b border-cyan-900/30 pb-1">
                <div className="col-span-12">Value</div>
              </div>
              
              {!currentRecords || (Array.isArray(currentRecords) && currentRecords.length === 0) ? (
                <div className="text-cyan-800 text-[11px] italic">No {activeTab} records found.</div>
              ) : Array.isArray(currentRecords) ? (
                currentRecords.map((rec: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 break-all hover:bg-cyan-900/20 px-1 rounded">
                    <div className="col-span-12">{renderRecordValue(rec)}</div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-12 gap-2 break-all hover:bg-cyan-900/20 px-1 rounded">
                  <div className="col-span-12">{renderRecordValue(currentRecords)}</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </HolographicCard>
  );
};
