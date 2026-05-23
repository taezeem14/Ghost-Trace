"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface HolographicCardProps extends HTMLMotionProps<"div"> {
  glowColor?: string;
}

export const HolographicCard = React.forwardRef<HTMLDivElement, HolographicCardProps>(
  ({ className, children, glowColor = 'rgba(6, 182, 212, 0.15)', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden",
          className
        )}
        whileHover={{
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}`
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Subtle inner grid line or reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
HolographicCard.displayName = 'HolographicCard';
