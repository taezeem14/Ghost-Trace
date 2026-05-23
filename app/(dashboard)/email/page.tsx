import React from 'react';

export default function EmailPage() {
  return (
    <div className="space-y-6 animate-in fade-in max-w-7xl mx-auto pt-20 pb-12">
      <h1 className="text-3xl font-mono text-cyan-300 font-bold tracking-tight">Email Intelligence</h1>
      <p className="text-cyan-600 font-mono text-sm mb-8">Enter an email target in the Global Search to begin.</p>
      
      <div className="bg-black/50 border border-cyan-900/30 p-8 rounded text-center">
        <span className="text-cyan-700 font-mono text-sm italic">Email scanning module standing by...</span>
      </div>
    </div>
  );
}
