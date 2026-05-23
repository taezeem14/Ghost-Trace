import React from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { Cpu } from 'lucide-react';

export const TechStackPanel = () => {
  const stack = ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Cloudflare'];

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Cpu className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Technology Stack</h2>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {stack.map((tech, i) => (
          <div key={i} className="px-2 py-1 bg-cyan-950/40 border border-cyan-800 rounded text-cyan-300 font-mono text-xs shadow-[0_0_10px_rgba(8,145,178,0.2)]">
            {tech}
          </div>
        ))}
      </div>
    </HolographicCard>
  );
};
