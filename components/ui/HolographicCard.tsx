"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useUiStore } from '@/store/uiStore';

interface HolographicCardProps extends HTMLMotionProps<"div"> {
  glowColor?: string;
}

export const HolographicCard = React.forwardRef<HTMLDivElement, HolographicCardProps>(
  ({ className, children, glowColor = 'rgba(6, 182, 212, 0.15)', ...props }, ref) => {
    const { ecoMode } = useUiStore();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative border overflow-hidden",
          ecoMode 
            ? "border-neutral-800 bg-neutral-900/95" 
            : "border-white/10 bg-black/40 backdrop-blur-md",
          className
        )}
        whileHover={!ecoMode ? {
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}`
        } : undefined}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Subtle inner grid line or reflection */}
        {!ecoMode && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
HolographicCard.displayName = 'HolographicCard';
