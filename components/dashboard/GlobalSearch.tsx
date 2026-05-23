"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOsintScan } from '@/lib/hooks/useOsintScan';

export const GlobalSearch = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { executeScan, isScanning } = useOsintScan();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    
    // Basic auto-detection logic for routing
    let type: 'domain' | 'ip' | 'email' | 'username' = 'username';
    if (input.includes('@')) type = 'email';
    else if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(input)) type = 'ip';
    else if (/\.[a-z]{2,}$/i.test(input) && !input.includes(' ')) type = 'domain';

    // Route to the appropriate dashboard page
    if (type === 'domain' || type === 'ip') {
      router.push(`/${type}/${encodeURIComponent(input)}`);
    } else {
      router.push(`/${type}`); // For email and username which might have a different route structure
    }
    
    // Execute the scan in the background
    await executeScan(input, type);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 w-5 h-5" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Domain, IP, Email, or Username to trace..."
        className="w-full bg-black/60 border border-cyan-900/50 rounded-lg py-4 pl-12 pr-4 text-cyan-100 placeholder:text-cyan-800 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        disabled={isScanning}
      />
      <button 
        type="submit" 
        disabled={isScanning || !input}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-950 text-cyan-400 px-4 py-2 rounded font-mono text-sm border border-cyan-800 hover:bg-cyan-900 transition-colors disabled:opacity-50"
      >
        {isScanning ? 'SCANNING...' : 'EXECUTE'}
      </button>
    </form>
  );
};
