import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { User, Calendar, MapPin } from 'lucide-react';

export const WhoisPanel = () => {
  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <User className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">WHOIS Record</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 font-mono text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-cyan-600">Registrar</span>
          <span className="text-cyan-300">Cloudflare, Inc.</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-cyan-600">Registered On</span>
          <div className="flex items-center gap-1 text-cyan-300">
            <Calendar className="w-3 h-3" /> 2020-05-12
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-cyan-600">Expires On</span>
          <div className="flex items-center gap-1 text-cyan-300">
            <Calendar className="w-3 h-3" /> 2025-05-12
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-cyan-600">Registrant Country</span>
          <div className="flex items-center gap-1 text-cyan-300">
            <MapPin className="w-3 h-3" /> US
          </div>
        </div>
      </div>
    </HolographicCard>
  );
};
