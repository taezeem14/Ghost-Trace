import { IPHeader } from '@/components/ip/IPHeader';
import { GeoIPPanel } from '@/components/ip/GeoIPPanel';
import { ASNPanel } from '@/components/ip/ASNPanel';
import { AbuseIPDBPanel } from '@/components/ip/AbuseIPDBPanel';
import { ShodanPanel } from '@/components/ip/ShodanPanel';
import { PortScanPanel } from '@/components/ip/PortScanPanel';
import { TraceroutePanel } from '@/components/ip/TraceroutePanel';
import { VirusTotalPanel } from '@/components/ip/VirusTotalPanel';
import { MiniGraph } from '@/components/graph/MiniGraph';

export default function IPReportPage({ params }: { params: { ip: string } }) {
  const ip = decodeURIComponent(params.ip);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <IPHeader ip={ip} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GeoIPPanel ip={ip} />
            <ASNPanel ip={ip} />
          </div>
          
          <PortScanPanel ip={ip} />
          <ShodanPanel ip={ip} />
          <TraceroutePanel ip={ip} />
        </div>
        
        <div className="space-y-6">
          <div className="h-[300px] border border-primary/20 bg-black/50 rounded-lg overflow-hidden relative">
            <div className="absolute top-2 left-2 z-10 text-xs font-mono text-primary/70">RELATIONSHIP_GRAPH</div>
            <MiniGraph target={ip} type="ip" />
          </div>
          
          <AbuseIPDBPanel ip={ip} />
          <VirusTotalPanel target={ip} type="ip" />
        </div>
      </div>
    </div>
  );
}
