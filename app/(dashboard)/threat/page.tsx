import { ThreatAggregator } from '@/components/threat/ThreatAggregator';

export default function ThreatIntelPage() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 border-b border-red-500/30 pb-4">
        <div className="p-2 bg-red-500/10 rounded border border-red-500/30 text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div>
          <h1 className="text-2xl font-mono font-bold text-white tracking-wider">THREAT_INTEL</h1>
          <p className="text-sm text-muted-foreground font-mono">Global vulnerability & active threat monitoring</p>
        </div>
      </div>
      
      <ThreatAggregator />
    </div>
  );
}
