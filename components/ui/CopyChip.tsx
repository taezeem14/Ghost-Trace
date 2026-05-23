"use client";
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyChipProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyChip: React.FC<CopyChipProps> = ({ text, label, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group flex items-center gap-2 px-2 py-1 bg-white/5 hover:bg-cyan-950/30 border border-white/10 hover:border-cyan-500/50 rounded-sm font-mono text-xs text-gray-300 hover:text-cyan-400 transition-all",
        className
      )}
    >
      <span className="truncate max-w-[150px]">{label || text}</span>
      <div className="relative w-3 h-3 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Check size={12} className="text-green-400" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Copy size={12} className="opacity-50 group-hover:opacity-100" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};
