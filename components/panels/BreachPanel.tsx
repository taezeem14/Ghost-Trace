import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Database, AlertTriangle } from 'lucide-react';

export const BreachPanel = () => {
  const breaches = [
    { name: 'LinkedIn', date: '2012-05-01', records: '164M' },
    { name: 'Adobe', date: '2013-10-04', records: '153M' },
  ];

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Database className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Breach Data</h2>
      </div>
      <div className="flex items-center gap-3 p-2 bg-red-950/30 border border-red-900/50 rounded text-red-400 font-mono text-xs">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Target found in 2 known data breaches.</span>
      </div>
      <div className="flex flex-col gap-2">
        {breaches.map((b, i) => (
          <div key={i} className="flex justify-between items-center bg-black/40 p-2 rounded border border-cyan-900/30 font-mono text-xs">
            <span className="text-cyan-300 font-semibold">{b.name}</span>
            <div className="flex items-center gap-3 text-cyan-600">
              <span>{b.records} records</span>
              <span>{b.date}</span>
            </div>
          </div>
        ))}
      </div>
    </HolographicCard>
  );
};
