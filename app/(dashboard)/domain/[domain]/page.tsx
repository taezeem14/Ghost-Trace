import React from 'react';
import { WhoisPanel } from '@/components/panels/WhoisPanel';
import { SSLPanel } from '@/components/panels/SSLPanel';
import { TechStackPanel } from '@/components/panels/TechStackPanel';
import { DNSPanel } from '@/components/panels/DNSPanel';
import { BreachPanel } from '@/components/panels/BreachPanel';
import { ThreatScorePanel } from '@/components/panels/ThreatScorePanel';
import { SubdomainPanel } from '@/components/panels/SubdomainPanel';
import { URLScanPanel } from '@/components/panels/URLScanPanel';
import { OTXPanel } from '@/components/panels/OTXPanel';

export default function DomainReportPage({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12 mt-20">
      <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
        <div>
          <h1 className="text-3xl font-mono text-cyan-300 font-bold tracking-tight">{domain}</h1>
          <p className="text-cyan-600 font-mono text-sm">Target Reconnaissance Overview</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WhoisPanel />
            <SSLPanel />
          </div>
          
          <DNSPanel />
          <TechStackPanel />
          <SubdomainPanel />
        </div>
        
        <div className="space-y-6">
          <ThreatScorePanel />
          <URLScanPanel />
          <OTXPanel />
          <BreachPanel />
        </div>
      </div>
    </div>
  );
}
