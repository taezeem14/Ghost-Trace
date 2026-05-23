import React from 'react';
import { cn } from '@/lib/utils';

export type StatusLevel = 'clean' | 'low' | 'moderate' | 'high' | 'critical';

interface StatusPillProps {
  level: StatusLevel;
  className?: string;
  label?: string;
}

const statusConfig: Record<StatusLevel, { bg: string, text: string, border: string, glow: string }> = {
  clean: { bg: 'bg-green-950/30', text: 'text-green-400', border: 'border-green-500/50', glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]' },
  low: { bg: 'bg-blue-950/30', text: 'text-blue-400', border: 'border-blue-500/50', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]' },
  moderate: { bg: 'bg-yellow-950/30', text: 'text-yellow-400', border: 'border-yellow-500/50', glow: 'shadow-[0_0_10px_rgba(234,179,8,0.3)]' },
  high: { bg: 'bg-orange-950/30', text: 'text-orange-400', border: 'border-orange-500/50', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.3)]' },
  critical: { bg: 'bg-red-950/30', text: 'text-red-400', border: 'border-red-500/50', glow: 'shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse' },
};

export const StatusPill: React.FC<StatusPillProps> = ({ level, className, label }) => {
  const config = statusConfig[level];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-mono font-medium border uppercase tracking-wider backdrop-blur-sm",
        config.bg, config.text, config.border, config.glow,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 bg-current")} />
      {label || level}
    </span>
  );
};
