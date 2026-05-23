"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, CheckSquare, Square } from 'lucide-react';
import { GlowButton } from './GlowButton';
import { GlitchText } from './GlitchText';

interface AuthorizationGateProps {
  onAuthorize: () => void;
  target?: string;
  description?: string;
}

export const AuthorizationGate: React.FC<AuthorizationGateProps> = ({ 
  onAuthorize, 
  target = "UNKNOWN TARGET",
  description = "This action requires explicit authorization. Intrusive scanning may trigger IDS/IPS systems."
}) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full border border-red-500/30 bg-black/80 backdrop-blur-xl p-6 relative overflow-hidden"
    >
      {/* Background hazard stripes */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,transparent_10px,transparent_20px)] opacity-50" />
      
      <div className="flex items-start gap-4 mt-2">
        <div className="p-2 bg-red-500/10 border border-red-500/30 text-red-500">
          <AlertTriangle size={24} className="animate-pulse" />
        </div>
        <div>
          <h3 className="font-mono text-lg font-bold text-red-500 flex items-center gap-2">
            <Shield size={16} />
            <GlitchText text="AUTHORIZATION REQUIRED" intensity="low" />
          </h3>
          <div className="mt-2 font-mono text-sm text-gray-300">
            <p>Target: <span className="text-white font-bold">{target}</span></p>
            <p className="mt-2 opacity-80 text-xs">{description}</p>
          </div>
        </div>
      </div>

      <div 
        className="mt-6 flex items-start gap-3 cursor-pointer group"
        onClick={() => setAgreed(!agreed)}
      >
        <div className="mt-0.5 text-cyan-500">
          {agreed ? <CheckSquare size={16} /> : <Square size={16} className="opacity-50 group-hover:opacity-100" />}
        </div>
        <p className="text-xs font-mono text-gray-400 select-none group-hover:text-gray-300 transition-colors">
          I confirm that I have explicit permission to perform this action against the target. I understand the legal and ethical implications.
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <GlowButton 
          variant={agreed ? "danger" : "secondary"}
          disabled={!agreed}
          onClick={onAuthorize}
          className={!agreed ? "opacity-50 cursor-not-allowed grayscale" : ""}
        >
          EXECUTE
        </GlowButton>
      </div>
    </motion.div>
  );
};
