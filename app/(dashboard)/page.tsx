import { GlobalSearch } from '@/components/dashboard/GlobalSearch';
import { RecentTargets } from '@/components/dashboard/RecentTargets';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { ThreatFeedOverview } from '@/components/dashboard/ThreatFeedOverview';

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(0,255,128,0.5)]">
          GHOST_TRACE
        </h1>
        <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
          Command & Control Center
        </p>
        
        <div className="w-full max-w-3xl mt-8">
          <GlobalSearch />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <QuickStats />
          <ThreatFeedOverview />
        </div>
        
        <div className="md:col-span-1">
          <RecentTargets />
        </div>
      </div>
    </div>
  );
}
