import React from 'react';
import { cn } from '@/lib/utils';

interface CornerBracketProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const CornerBracket: React.FC<CornerBracketProps> = ({ 
  children, 
  className,
  size = 12,
  strokeWidth = 2
}) => {
  return (
    <div className={cn("relative p-4", className)}>
      {/* Top Left */}
      <div 
        className="absolute top-0 left-0 border-t border-l border-cyan-500/70" 
        style={{ width: size, height: size, borderWidth: `${strokeWidth}px 0 0 ${strokeWidth}px` }} 
      />
      {/* Top Right */}
      <div 
        className="absolute top-0 right-0 border-t border-r border-cyan-500/70" 
        style={{ width: size, height: size, borderWidth: `${strokeWidth}px ${strokeWidth}px 0 0` }} 
      />
      {/* Bottom Left */}
      <div 
        className="absolute bottom-0 left-0 border-b border-l border-cyan-500/70" 
        style={{ width: size, height: size, borderWidth: `0 0 ${strokeWidth}px ${strokeWidth}px` }} 
      />
      {/* Bottom Right */}
      <div 
        className="absolute bottom-0 right-0 border-b border-r border-cyan-500/70" 
        style={{ width: size, height: size, borderWidth: `0 ${strokeWidth}px ${strokeWidth}px 0` }} 
      />
      
      {children}
    </div>
  );
};
