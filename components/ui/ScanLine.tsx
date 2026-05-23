"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScanLineProps {
  className?: string;
  duration?: number;
}

export const ScanLine: React.FC<ScanLineProps> = ({ className, duration = 4 }) => {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden z-50", className)}>
      <motion.div
        className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-50"
        initial={{ y: -100 }}
        animate={{ y: "100vh" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};
