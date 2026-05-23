import { UsernameEnumeration } from '@/components/username/UsernameEnumeration';

export default function UsernamePage() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 border-b border-primary/20 pb-4">
        <div className="p-2 bg-primary/10 rounded border border-primary/30 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <h1 className="text-2xl font-mono font-bold text-white tracking-wider">USER_ENUMERATION</h1>
          <p className="text-sm text-muted-foreground font-mono">Cross-platform username presence detection</p>
        </div>
      </div>
      
      <UsernameEnumeration />
    </div>
  );
}
