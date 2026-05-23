import { EmailInvestigation } from '@/components/email/EmailInvestigation';

export default function EmailPage() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 border-b border-primary/20 pb-4">
        <div className="p-2 bg-primary/10 rounded border border-primary/30 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </div>
        <div>
          <h1 className="text-2xl font-mono font-bold text-white tracking-wider">EMAIL_INTEL</h1>
          <p className="text-sm text-muted-foreground font-mono">Breach data, social profiles, and reputation</p>
        </div>
      </div>
      
      <EmailInvestigation />
    </div>
  );
}
