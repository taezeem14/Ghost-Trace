"use client";
import React, { useState } from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { History, ArrowRight, Loader2 } from 'lucide-react';
import { useHistoryStore } from '@/store/historyStore';
import { useRouter } from 'next/navigation';
import { useOsintScan } from '@/lib/hooks/useOsintScan';

export const RecentTargets = () => {
  const { history } = useHistoryStore();
  const recent = history?.slice(0, 5) || [];
  const router = useRouter();
  const { executeScan, isScanning } = useOsintScan();
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);

  const handleTargetClick = async (type: string, target: string) => {
    if (isScanning) return;
    setLoadingTarget(target);
    
    // Auto route based on type
    if (type === 'domain' || type === 'ip') {
      router.push(`/${type}/${encodeURIComponent(target)}`);
    } else {
      router.push(`/${type}`);
    }

    await executeScan(target, type as any);
    setLoadingTarget(null);
  };

  return (
    <HolographicCard className="p-4 flex flex-col gap-4 min-h-[300px]">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <History className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Recent Targets</h2>
      </div>

      <div className="flex flex-col gap-2">
        {recent.length === 0 ? (
          <div className="text-cyan-800 text-xs font-mono italic p-2">No recent scans found. Execute a scan to populate history.</div>
        ) : (
          recent.map((entry, idx) => (
            <div 
              key={idx} 
              onClick={() => handleTargetClick(entry.type, entry.target)}
              className="flex justify-between items-center bg-black/40 p-3 rounded border border-cyan-900/30 hover:border-cyan-500/50 transition-colors cursor-pointer group"
            >
              <div className="flex flex-col">
                <span className="text-cyan-300 font-mono text-sm font-bold truncate max-w-[150px]">{entry.target}</span>
                <span className="text-cyan-600 font-mono text-[10px] uppercase">{entry.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold ${entry.threatScore > 70 ? 'text-red-400' : entry.threatScore > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {entry.threatScore}
                </span>
                {loadingTarget === entry.target ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-cyan-800 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </HolographicCard>
  );
};
