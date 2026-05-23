"use client";
import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { GripHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingPanelProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  defaultPosition?: { x: number; y: number };
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({ 
  title, 
  children, 
  onClose, 
  className,
  defaultPosition = { x: 0, y: 0 } 
}) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      initial={defaultPosition}
      className={cn(
        "absolute z-40 w-80 bg-black/80 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col",
        className
      )}
    >
      <div 
        className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 text-cyan-500">
          <GripHorizontal size={14} />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider">{title}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={14} />
          </button>
        )}
      </div>
      <div className="p-4 flex-1 overflow-auto max-h-[80vh]">
        {children}
      </div>
    </motion.div>
  );
};
