"use client";
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, intensity = 'medium', className, ...props }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > (intensity === 'high' ? 0.5 : 0.8)) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <span 
      className={cn(
        "relative inline-block font-mono font-bold", 
        isGlitching ? "animate-pulse text-cyan-400" : "",
        className
      )}
      {...props}
      data-text={text}
    >
      {text}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 -ml-[2px] text-red-500 mix-blend-screen opacity-70" aria-hidden="true">{text}</span>
          <span className="absolute top-0 left-0 ml-[2px] text-blue-500 mix-blend-screen opacity-70" aria-hidden="true">{text}</span>
        </>
      )}
    </span>
  );
};
