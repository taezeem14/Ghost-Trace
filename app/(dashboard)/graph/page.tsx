import React from 'react';

export default function GraphPage() {
  return (
    <div className="space-y-6 animate-in fade-in max-w-7xl mx-auto pt-20 pb-12">
      <h1 className="text-3xl font-mono text-cyan-300 font-bold tracking-tight">Intelligence Graph</h1>
      <p className="text-cyan-600 font-mono text-sm mb-8">Visual relationship mapping.</p>
      
      <div className="bg-black/50 border border-cyan-900/30 h-[500px] flex items-center justify-center rounded">
        <span className="text-cyan-700 font-mono text-sm italic">Graph view initialized. No active nodes.</span>
      </div>
    </div>
  );
}
