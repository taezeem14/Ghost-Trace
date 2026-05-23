import React from 'react';
import { cn } from '@/lib/utils';

export const NeonDivider: React.FC<{ className?: string; color?: 'cyan' | 'purple' | 'red' }> = ({ 
  className, 
  color = 'cyan' 
}) => {
  const colors = {
    cyan: "from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.5)]",
    purple: "from-transparent via-purple-500 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]",
    red: "from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  };

  return (
    <div className={cn("w-full h-px relative flex items-center justify-center py-4", className)}>
      <div className={cn("absolute w-full h-[1px] bg-gradient-to-r opacity-50", colors[color])} />
      <div className={cn("absolute w-1/3 h-[2px] bg-gradient-to-r", colors[color])} />
    </div>
  );
};
