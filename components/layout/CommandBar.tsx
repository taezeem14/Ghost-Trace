'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, TerminalSquare } from 'lucide-react';

export const CommandBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-gray-950 border border-cyan-900/60 rounded-xl shadow-2xl overflow-hidden shadow-cyan-900/20"
          >
            <div className="flex items-center px-4 py-3 border-b border-cyan-900/50">
              <Search className="w-5 h-5 text-cyan-500 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Search domains, IPs, hashes, or run commands..."
                className="flex-1 bg-transparent border-none outline-none text-cyan-100 font-mono text-sm placeholder:text-cyan-800"
              />
              <div className="flex items-center gap-1">
                <kbd className="bg-cyan-950 border border-cyan-900 text-cyan-500 px-2 py-0.5 rounded text-xs font-mono">ESC</kbd>
              </div>
            </div>
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-mono text-cyan-700 uppercase tracking-wider">Suggestions</div>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left rounded hover:bg-cyan-950/50 text-cyan-300 font-mono text-sm transition-colors">
                <TerminalSquare className="w-4 h-4 text-cyan-600" />
                <span>Run WHOIS lookup</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left rounded hover:bg-cyan-950/50 text-cyan-300 font-mono text-sm transition-colors">
                <Command className="w-4 h-4 text-cyan-600" />
                <span>Scan Open Ports</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
