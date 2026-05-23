import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/70 group-focus-within:text-cyan-400 transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-black/50 border border-cyan-900 text-cyan-100 placeholder:text-cyan-800/50 font-mono text-sm py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all",
            icon ? "pl-10 pr-4" : "px-4",
            className
          )}
          {...props}
        />
        {/* Scanline focus effect */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-400 w-0 group-focus-within:w-full transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      </div>
    );
  }
);
CyberInput.displayName = 'CyberInput';
