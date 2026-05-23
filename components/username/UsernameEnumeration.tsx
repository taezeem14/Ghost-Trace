"use client";

import React, { useState } from 'react';
import { HolographicCard } from '@/components/ui/HolographicCard';
import { CyberInput } from '@/components/ui/CyberInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { Search, Loader2, Link2, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface ResultItem {
  site: string;
  url: string;
}

export function UsernameEnumeration() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [searchedUsername, setSearchedUsername] = useState('');
  const [error, setError] = useState('');

  const allPlatforms = [
    'GitHub', 'GitLab', 'Twitter', 'Reddit', 'Pinterest', 'Spotify', 'Steam', 
    'SoundCloud', 'Medium', 'Dev.to', 'Behance', 'Linktree', 'Vimeo', 
    'Keybase', 'Patreon', 'DockerHub', 'npm', 'CodePen', 'DailyMotion', 'BuyMeACoffee'
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);
    setSearchedUsername(username.trim());

    try {
      const response = await fetch('/api/osint/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      if (data.available && data.data && Array.isArray(data.data.foundOn)) {
        setResults(data.data.foundOn);
      } else {
        setError('Failed to fetch valid search data.');
      }
    } catch (err) {
      setError('An error occurred while probing platform APIs. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Search Console */}
      <div className="lg:col-span-1 space-y-6">
        <HolographicCard className="p-6 border-primary/20 bg-black/60">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 border-b border-primary/10 pb-3">
              <Search className="text-cyan-400 w-5 h-5" />
              <h2 className="text-lg font-mono font-bold text-white tracking-wide">TARGET_PROBE</h2>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-cyan-400/80">TARGET_USERNAME</label>
                <CyberInput
                  placeholder="e.g. linustorvalds, root"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>

              <GlowButton type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    PROBING...
                  </>
                ) : (
                  'LAUNCH_SCAN'
                )}
              </GlowButton>
            </form>

            {error && (
              <div className="bg-red-950/20 border border-red-500/20 p-3 rounded flex items-start space-x-2.5 text-red-400 font-mono text-xs leading-normal">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="border-t border-white/5 pt-4 space-y-2.5 font-mono text-[11px] text-muted-foreground leading-relaxed">
              <p className="text-cyan-400/80 font-semibold">ABOUT_USERNAME_ENUMERATION:</p>
              <p>
                Looks up targets across {allPlatforms.length} popular code hosting sites, social platforms, and digital developer directories by mapping URLs and evaluating HTTP status headers.
              </p>
              <div className="bg-cyan-950/20 border border-cyan-500/20 p-2.5 rounded text-cyan-300">
                <span className="font-bold text-cyan-400 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> FREE API KEYLESS:</span> No API registration required. Queries are dispatched through local async requests.
              </div>
            </div>
          </div>
        </HolographicCard>
      </div>

      {/* Grid Results Window */}
      <div className="lg:col-span-2">
        <HolographicCard className="p-6 h-full min-h-[500px] flex flex-col border-primary/20 bg-black/60">
          <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-6">
            <span className="font-mono text-sm font-bold text-white tracking-wide">PROBE_RESULTS_STREAM</span>
            {results !== null && (
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-2 py-0.5 rounded">
                SCAN_COMPLETE • TARGET: {searchedUsername}
              </span>
            )}
          </div>

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 font-mono text-cyan-400/80 text-xs">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <div>
                <p className="font-bold text-cyan-300">PROBING PLATFORMS IN PROGRESS</p>
                <p className="text-[10px] text-zinc-500 mt-1">Executing HTTP queries against registry servers...</p>
              </div>
            </div>
          )}

          {!loading && results === null && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-cyan-950/40 rounded">
              <Search className="w-8 h-8 text-cyan-900/80 mb-2 animate-pulse" />
              <p className="text-xs font-mono text-cyan-800">Enter a target username in the sidebar console and scan.</p>
            </div>
          )}

          {!loading && results !== null && (
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {allPlatforms.map((platformName) => {
                  const match = results.find(r => r.site.toLowerCase() === platformName.toLowerCase());
                  const found = !!match;

                  return (
                    <div 
                      key={platformName} 
                      className={`p-3 border font-mono rounded flex items-center justify-between transition-all ${
                        found 
                          ? 'border-emerald-500/30 bg-emerald-950/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)]' 
                          : 'border-neutral-800 bg-zinc-950/30 text-zinc-600'
                      }`}
                    >
                      <div className="flex flex-col space-y-0.5">
                        <span className={`text-xs font-bold ${found ? 'text-emerald-300' : 'text-zinc-500'}`}>
                          {platformName}
                        </span>
                        {found && (
                          <span className="text-[9px] text-emerald-500 truncate max-w-[180px]">
                            {match.url}
                          </span>
                        )}
                      </div>

                      {found ? (
                        <a 
                          href={match.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-emerald-950/50 rounded text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <Link2 className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-[9px] uppercase px-1 border border-neutral-800 bg-neutral-900 text-zinc-600">
                          EMPTY
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>TOTAL_PROFILES_IDENTIFIED: <span className="text-emerald-400 font-bold">{results.length}</span></span>
                </div>
                <div>
                  <span>ACCURACY: <span className="text-cyan-400">95% (HTTP_HEADER_MATCH)</span></span>
                </div>
              </div>
            </div>
          )}

        </HolographicCard>
      </div>

    </div>
  );
}
