"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, Activity, Crosshair, Terminal, 
  Settings, Fingerprint, Mail 
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Crosshair, label: 'Command Center', path: '/' },
  { icon: Fingerprint, label: 'Username Intel', path: '/username' },
  { icon: Mail, label: 'Email Intel', path: '/email' },
  { icon: ShieldAlert, label: 'Threat Intel', path: '/threat' },
  { icon: Activity, label: 'Infra Graph', path: '/graph' },
  { icon: Terminal, label: 'Ghost Shell', path: '/terminal' },
  { icon: Settings, label: 'System Config', path: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-16 hover:w-64 transition-all duration-300 h-screen bg-black/90 backdrop-blur-xl border-r border-cyan-900/50 flex flex-col items-start overflow-hidden group z-50 fixed left-0 top-0">
      <Link href="/" className="h-16 w-full flex items-center justify-center border-b border-cyan-900/50 group-hover:justify-start group-hover:px-4 cursor-pointer">
        <Terminal className="text-cyan-400 w-6 h-6 shrink-0" />
        <span className="text-cyan-400 font-mono font-bold ml-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GhostTrace OSINT</span>
      </Link>
      
      <nav className="flex-1 w-full py-4 flex flex-col gap-2">
        {NAV_ITEMS.map((item, idx) => {
          // Check if current path matches the nav item path
          const isActive = pathname === item.path;

          return (
            <Link 
              key={idx} 
              href={item.path}
              className={`w-full flex items-center px-4 py-3 hover:bg-cyan-950/30 transition-all ${
                isActive 
                  ? 'border-l-2 border-cyan-400 bg-cyan-950/20' 
                  : 'border-l-2 border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 transition-colors ${
                isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
              }`} />
              <span className={`ml-4 font-mono text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                isActive ? 'text-cyan-400' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
