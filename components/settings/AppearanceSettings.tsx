"use client";

import React from 'react';
import { useUiStore } from '@/store/uiStore';
import { HolographicCard } from '@/components/ui/HolographicCard';
import { Leaf, Moon, Sun, Monitor, ShieldAlert } from 'lucide-react';

export function AppearanceSettings() {
  const { ecoMode, toggleEcoMode, theme, setTheme } = useUiStore();

  return (
    <HolographicCard className="p-6 border-primary/20 bg-black/60 shadow-lg h-full">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2 border-b border-primary/10 pb-4">
          <Monitor className="text-cyan-400 w-5 h-5" />
          <h2 className="text-lg font-mono font-bold text-white tracking-wide">VISUAL_ENGINE</h2>
        </div>

        {/* Eco-Astral Mode Card */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Leaf className={`w-4 h-4 ${ecoMode ? 'text-emerald-400 animate-bounce' : 'text-neutral-500'}`} />
              Eco-Astral Mode (Lag Fix)
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={ecoMode} 
                onChange={toggleEcoMode} 
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500/80 peer-checked:after:bg-white"></div>
            </label>
          </div>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
            If your old laptop is fighting for its life, toggle this cheat code. It:
          </p>
          <ul className="text-[11px] font-mono text-cyan-500/80 space-y-1.5 list-disc pl-4">
            <li><span className="text-cyan-400 font-bold">Stops Starfield Canvas:</span> Instantly deletes the GPU-heavy dynamic background particles.</li>
            <li><span className="text-cyan-400 font-bold">Drops Backdrop Filters:</span> Disables resource-intensive hardware blur effects.</li>
            <li><span className="text-cyan-400 font-bold">Applies Solid Palettes:</span> Switches out glowing glassmorphic elements for flat, high-contrast panels.</li>
          </ul>
        </div>

        <div className="border-t border-white/5 pt-4">
          <span className="font-mono text-sm font-bold text-cyan-300 mb-3 block">THEME_SELECT</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'DARK', icon: Moon },
              { id: 'light', label: 'LIGHT', icon: Sun },
              { id: 'system', label: 'SYS', icon: Monitor }
            ].map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`flex flex-col items-center justify-center p-3 border font-mono text-[10px] tracking-widest gap-2 transition-all ${
                    isActive
                      ? 'border-cyan-500 bg-cyan-950/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'border-white/5 bg-black/40 text-neutral-500 hover:border-white/10 hover:text-neutral-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {ecoMode && (
          <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded flex items-start space-x-2.5 text-emerald-400/90 font-mono text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-bold">LOW_POWER_ENGAGED:</span> Dynamic UI scripts deactivated. FPS optimization maximum. Enjoy the butter-smooth terminal execution.
            </div>
          </div>
        )}
      </div>
    </HolographicCard>
  );
}
