'use client';

import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThreatScorePanel = ({ score = 82 }) => {
  // Calculate arc stroke properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const isHighRisk = score > 75;
  const color = isHighRisk ? '#ef4444' : score > 40 ? '#f59e0b' : '#10b981';

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <ShieldAlert className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Threat Score</h2>
      </div>
      
      <div className="flex items-center justify-center py-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Background Arc */}
          <svg className="w-full h-full transform -rotate-90 absolute">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-cyan-950"
            />
            {/* Foreground Arc */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-bold" style={{ color }}>{score}</span>
            <span className="font-mono text-[10px] text-cyan-600 uppercase">/ 100</span>
          </div>
        </div>
      </div>
      <div className="text-center font-mono text-xs mt-2" style={{ color }}>
        {isHighRisk ? 'CRITICAL RISK DETECTED' : 'MODERATE RISK'}
      </div>
    </HolographicCard>
  );
};
