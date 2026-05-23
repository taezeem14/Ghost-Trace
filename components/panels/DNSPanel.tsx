'use client';

import React, { useState } from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA'];

export const DNSPanel = () => {
  const [activeTab, setActiveTab] = useState('A');

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
        <div className="flex items-center gap-2">
          <Globe className="text-cyan-400 w-5 h-5" />
          <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">DNS Records</h2>
        </div>
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-cyan-900/30">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                activeTab === tab ? 'bg-cyan-900 text-cyan-100' : 'text-cyan-600 hover:text-cyan-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-black/40 border border-cyan-900/30 rounded p-3 min-h-[100px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="font-mono text-xs text-cyan-300 flex flex-col gap-2"
          >
            <div className="grid grid-cols-12 gap-2 text-cyan-700 mb-1 border-b border-cyan-900/30 pb-1">
              <div className="col-span-4">Host</div>
              <div className="col-span-2">TTL</div>
              <div className="col-span-6">Value</div>
            </div>
            <div className="grid grid-cols-12 gap-2 break-all">
              <div className="col-span-4">@</div>
              <div className="col-span-2">300</div>
              <div className="col-span-6">
                {activeTab === 'A' ? '192.0.2.1' : activeTab === 'MX' ? '10 mail.example.com' : '...'}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </HolographicCard>
  );
};
