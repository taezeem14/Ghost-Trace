import React from 'react';
import { cn } from '@/lib/utils';

export const GridPlane: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden perspective-[1000px]", className)}>
      {/* Fading mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black z-10" />
      
      {/* The grid */}
      <div 
        className="absolute bottom-0 left-[-50%] right-[-50%] h-[100vh] origin-bottom"
        style={{
          transform: 'rotateX(75deg)',
          backgroundImage: `
            linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(to top, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {/* Animated scanning line over the grid */}
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-[scan_8s_linear_infinite]" />
      </div>
    </div>
  );
};
