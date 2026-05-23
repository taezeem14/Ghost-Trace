import { GhostShell } from '@/components/terminal/GhostShell';

export default function TerminalPage() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 border-b border-primary/20 pb-4">
        <div className="p-2 bg-primary/10 rounded border border-primary/30 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
        </div>
        <div>
          <h1 className="text-2xl font-mono font-bold text-white tracking-wider">GHOST_SHELL</h1>
          <p className="text-sm text-muted-foreground font-mono">Direct command-line interface for OSINT tools</p>
        </div>
      </div>
      
      <div className="flex-1 min-h-[600px] border border-primary/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,255,128,0.1)]">
        <GhostShell />
      </div>
    </div>
  );
}
