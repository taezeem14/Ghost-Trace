import { DomainHeader } from '@/components/domain/DomainHeader';
import { WhoisPanel } from '@/components/domain/WhoisPanel';
import { SSLPanel } from '@/components/domain/SSLPanel';
import { TechStackPanel } from '@/components/domain/TechStackPanel';
import { DNSPanel } from '@/components/domain/DNSPanel';
import { BreachPanel } from '@/components/domain/BreachPanel';
import { SubdomainPanel } from '@/components/domain/SubdomainPanel';
import { URLScanPanel } from '@/components/domain/URLScanPanel';
import { OTXPanel } from '@/components/domain/OTXPanel';
import { MiniGraph } from '@/components/graph/MiniGraph';

export default function DomainReportPage({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DomainHeader domain={domain} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WhoisPanel domain={domain} />
            <SSLPanel domain={domain} />
          </div>
          
          <DNSPanel domain={domain} />
          <SubdomainPanel domain={domain} />
          <TechStackPanel domain={domain} />
        </div>
        
        <div className="space-y-6">
          <div className="h-[300px] border border-primary/20 bg-black/50 rounded-lg overflow-hidden relative">
            <div className="absolute top-2 left-2 z-10 text-xs font-mono text-primary/70">RELATIONSHIP_GRAPH</div>
            <MiniGraph target={domain} type="domain" />
          </div>
          
          <URLScanPanel domain={domain} />
          <OTXPanel target={domain} type="domain" />
          <BreachPanel domain={domain} />
        </div>
      </div>
    </div>
  );
}
