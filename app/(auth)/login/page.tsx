import { GlitchText } from '@/components/ui/GlitchText';
import { CyberInput } from '@/components/ui/CyberInput';
import React from 'react';
import { Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,128,0.1)_0%,transparent_50%)] animate-pulse-slow"></div>
      
      <div className="z-10 w-full max-w-md p-8 bg-black/50 border border-primary/30 backdrop-blur-md rounded-lg shadow-[0_0_50px_rgba(0,255,128,0.1)] flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <Fingerprint className="text-cyan-400 w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-bold mb-8 tracking-widest text-white">
          <GlitchText text="GHOST_TRACE" />
        </h1>
        
        <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <CyberInput 
              type="text" 
              placeholder="OPERATIVE_ID" 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <CyberInput 
              type="password" 
              placeholder="PASSPHRASE" 
              className="w-full"
            />
          </div>
          
          <CyberButton type="submit" className="w-full mt-4" variant="primary">
            INITIALIZE_UPLINK
          </CyberButton>
        </form>
        
        <div className="mt-8 text-xs text-primary/60 text-center uppercase tracking-widest">
          <p>Unauthorized access is strictly prohibited.</p>
          <p className="mt-1">Connections are logged and traced.</p>
        </div>
      </div>
      
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-20"></div>
    </div>
  );
}
