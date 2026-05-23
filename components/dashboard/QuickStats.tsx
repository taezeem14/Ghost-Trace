"use client";
import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Activity, ShieldAlert, Target } from 'lucide-react';
import { useHistoryStore } from '@/store/historyStore';

export const QuickStats = () => {
  const { history } = useHistoryStore();
  const totalScans = history?.length || 0;
  const highRiskScans = history?.filter(h => h.threatScore > 70).length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <HolographicCard className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-cyan-500">
          <Activity className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">Total Scans</span>
        </div>
        <span className="text-3xl font-mono font-bold text-cyan-100">{totalScans}</span>
      </HolographicCard>

      <HolographicCard className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-red-400">
          <ShieldAlert className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">High Risk Targets</span>
        </div>
        <span className="text-3xl font-mono font-bold text-red-400">{highRiskScans}</span>
      </HolographicCard>

      <HolographicCard className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-emerald-400">
          <Target className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">System Status</span>
        </div>
        <span className="text-xl mt-2 font-mono font-bold text-emerald-400 uppercase animate-pulse">Online</span>
      </HolographicCard>
    </div>
  );
};
