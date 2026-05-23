import React from 'react';
import { GeoPanel } from '@/components/panels/GeoPanel';
import { ASNPanel } from '@/components/panels/ASNPanel';
import { ThreatScorePanel } from '@/components/panels/ThreatScorePanel';
// Placeholders for future panels
// import { AbuseIPDBPanel } from '@/components/panels/AbuseIPDBPanel';
// import { ShodanPanel } from '@/components/panels/ShodanPanel';
// import { PortScanPanel } from '@/components/panels/PortScanPanel';
// import { TraceroutePanel } from '@/components/panels/TraceroutePanel';
// import { VirusTotalPanel } from '@/components/panels/VirusTotalPanel';

export default function IPReportPage({ params }: { params: { ip: string } }) {
  const ip = decodeURIComponent(params.ip);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12 mt-20">
      <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
        <div>
          <h1 className="text-3xl font-mono text-cyan-300 font-bold tracking-tight">{ip}</h1>
          <p className="text-cyan-600 font-mono text-sm">Target IP Reconnaissance Overview</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GeoPanel />
            <ASNPanel />
          </div>
          
          {/* <PortScanPanel /> */}
          {/* <ShodanPanel /> */}
          {/* <TraceroutePanel /> */}
        </div>
        
        <div className="space-y-6">
          <ThreatScorePanel />
          {/* <AbuseIPDBPanel /> */}
          {/* <VirusTotalPanel /> */}
        </div>
      </div>
    </div>
  );
}
