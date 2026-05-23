"use client";

import React, { useState } from 'react';
import { useApiKeyStore } from '@/store/apiKeyStore';
import { HolographicCard } from '@/components/ui/HolographicCard';
import { CyberInput } from '@/components/ui/CyberInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { Eye, EyeOff, Key, Check, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';

export function ApiKeyManager() {
  const { keys, setKey, removeKey, clearAllKeys } = useApiKeyStore();
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [localKeys, setLocalKeys] = useState<Record<string, string>>({});

  const services = [
    { id: 'shodan', name: 'Shodan API', placeholder: 'Enter Shodan API key', description: 'Used for IP host lookup, ports, and vulnerabilities' },
    { id: 'virustotal', name: 'VirusTotal API', placeholder: 'Enter VirusTotal API key', description: 'Used for IP/domain safety scanning' },
    { id: 'hibp', name: 'HaveIBeenPwned API', placeholder: 'Enter HIBP API key', description: 'Used for checking breached emails' },
    { id: 'hunter', name: 'Hunter.io API', placeholder: 'Enter Hunter.io API key', description: 'Used for email hunting and domain search' },
    { id: 'alienvault', name: 'AlienVault OTX API', placeholder: 'Enter AlienVault OTX key', description: 'Used for open threat intelligence pulses' },
    { id: 'github', name: 'GitHub Token', placeholder: 'Enter GitHub Personal Access Token', description: 'Used for looking up public username repos & leaks' },
    { id: 'censys', name: 'Censys API API ID:Secret', placeholder: 'Format: ID:Secret', description: 'Used for advanced certificate and host mapping' }
  ] as const;

  const toggleVisibility = (id: string) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id: string, val: string) => {
    setLocalKeys(prev => ({ ...prev, [id]: val }));
  };

  const handleSave = (id: typeof services[number]['id']) => {
    const value = localKeys[id] || '';
    if (value.trim()) {
      setKey(id, value.trim());
      setLocalKeys(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleDelete = (id: typeof services[number]['id']) => {
    removeKey(id);
    setLocalKeys(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <HolographicCard className="p-6 border-primary/20 bg-black/60 shadow-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b border-primary/10 pb-4">
          <div className="flex items-center space-x-2">
            <Key className="text-cyan-400 w-5 h-5 animate-pulse" />
            <h2 className="text-lg font-mono font-bold text-white tracking-wide">API_KEY_REGISTRY</h2>
          </div>
          {Object.keys(keys).length > 0 && (
            <button 
              onClick={clearAllKeys}
              className="text-xs font-mono text-red-400 hover:text-red-300 border border-red-500/20 px-2 py-1 bg-red-950/10 hover:bg-red-900/20 transition-all flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> PURGE_ALL_KEYS
            </button>
          )}
        </div>

        <div className="bg-cyan-950/10 border border-cyan-500/10 p-3.5 rounded flex items-start space-x-3 text-cyan-400/80 font-mono text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-cyan-300 font-bold">LOCAL_STORAGE_ENCRYPT:</span> All API keys are saved locally inside your browser's sandboxed localStorage. They are sent directly to API endpoints and never routed through remote middleware servers.
          </div>
        </div>

        <div className="space-y-6 pt-2">
          {services.map((service) => {
            const hasSavedKey = !!keys[service.id];
            const isVisible = !!visibleKeys[service.id];
            const currentInputValue = localKeys[service.id] ?? '';

            return (
              <div key={service.id} className="group flex flex-col space-y-2 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <div>
                    <span className="font-mono text-sm font-bold text-cyan-300 flex items-center gap-2">
                      {service.name}
                      {hasSavedKey ? (
                        <span className="flex items-center gap-1 text-[10px] font-normal text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3" /> ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-normal text-amber-500/70 bg-amber-950/20 border border-amber-500/20 px-1.5 py-0.5 rounded">
                          INACTIVE
                        </span>
                      )}
                    </span>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{service.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <CyberInput
                      type={isVisible ? 'text' : 'password'}
                      placeholder={hasSavedKey ? '••••••••••••••••••••••••••••••••' : service.placeholder}
                      value={currentInputValue}
                      onChange={(e) => handleInputChange(service.id, e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility(service.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/60 hover:text-cyan-400 transition-colors"
                    >
                      {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <GlowButton
                      onClick={() => handleSave(service.id)}
                      disabled={!currentInputValue.trim()}
                      className="px-3 py-2 disabled:opacity-40 disabled:hover:box-shadow-none"
                    >
                      <Check className="w-4 h-4" />
                    </GlowButton>

                    {hasSavedKey && (
                      <GlowButton
                        variant="danger"
                        onClick={() => handleDelete(service.id)}
                        className="px-3 py-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </GlowButton>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HolographicCard>
  );
}
