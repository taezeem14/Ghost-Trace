'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, TerminalSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOsintScan } from '@/lib/hooks/useOsintScan';

export const CommandBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { executeScan } = useOsintScan();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-command-bar', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('open-command-bar', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExecute = async (inputVal: string) => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    setIsOpen(false);
    setQuery('');

    // Basic auto-detection logic for routing
    let type: 'domain' | 'ip' | 'email' | 'username' = 'username';
    if (trimmed.includes('@')) type = 'email';
    else if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(trimmed)) type = 'ip';
    else if (/\.[a-z]{2,}$/i.test(trimmed) && !trimmed.includes(' ')) type = 'domain';

    // Route to appropriate dashboard page
    if (type === 'domain' || type === 'ip') {
      router.push(`/${type}/${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`/${type}`);
    }

    // Execute the scan in the background
    await executeScan(trimmed, type);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecute(query);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
          {/* Backdrop click closer */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-zinc-950 border border-cyan-900/60 rounded-xl shadow-2xl overflow-hidden shadow-cyan-900/20 z-10 font-mono"
          >
            <form onSubmit={handleFormSubmit} className="flex items-center px-4 py-4 border-b border-cyan-900/50">
              <Search className="w-5 h-5 text-cyan-500 mr-3" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search domains, IPs, hashes, usernames, or emails..."
                className="flex-1 bg-transparent border-none outline-none text-cyan-100 text-sm placeholder:text-cyan-800 focus:ring-0"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="bg-cyan-950 border border-cyan-900 text-cyan-500 px-2 py-0.5 rounded text-[10px]">ENTER</kbd>
                <kbd className="bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded text-[10px]">ESC</kbd>
              </div>
            </form>
            
            <div className="p-2.5">
              <div className="px-2.5 py-1.5 text-[10px] text-cyan-700 uppercase tracking-widest">Suggestions & Hotkeys</div>
              
              <button 
                type="button"
                onClick={() => handleExecute('google.com')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded hover:bg-cyan-950/40 text-cyan-300 text-xs transition-colors"
              >
                <TerminalSquare className="w-4 h-4 text-cyan-600" />
                <span>Trace Domain: <span className="text-cyan-400 font-bold">google.com</span></span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleExecute('1.1.1.1')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded hover:bg-cyan-950/40 text-cyan-300 text-xs transition-colors"
              >
                <Command className="w-4 h-4 text-cyan-600" />
                <span>Trace IP: <span className="text-cyan-400 font-bold">1.1.1.1</span></span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
