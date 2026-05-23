import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CacheEntry {
  data: any;
  timestamp: number;
}

interface ScanStore {
  cache: Record<string, CacheEntry>;
  activeScan: { type: string; target: string; status: 'idle' | 'scanning' | 'complete' | 'error' } | null;
  scanResults: any | null;
  threatScore: number;
  
  setCache: (type: string, target: string, data: any) => void;
  getCache: (type: string, target: string) => any | null;
  setActiveScan: (scan: ScanStore['activeScan']) => void;
  setScanResults: (results: any, score: number) => void;
  clearCache: () => void;
}

const CACHE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export const useScanStore = create<ScanStore>()(
  persist(
    (set, get) => ({
      cache: {},
      activeScan: null,
      scanResults: null,
      threatScore: 0,

      setCache: (type, target, data) => {
        const key = `${type}:${target}`;
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: { data, timestamp: Date.now() },
          },
        }));
      },

      getCache: (type, target) => {
        const key = `${type}:${target}`;
        const entry = get().cache[key];
        if (!entry) return null;
        
        // Check expiry
        if (Date.now() - entry.timestamp > CACHE_EXPIRY_MS) {
          // Optional: clear expired entry here
          return null;
        }
        
        return entry.data;
      },

      setActiveScan: (activeScan) => set({ activeScan }),
      
      setScanResults: (scanResults, threatScore) => set({ scanResults, threatScore }),

      clearCache: () => set({ cache: {} }),
    }),
    {
      name: 'ghost-trace-scan-cache',
      partialize: (state) => ({ cache: state.cache }),
    }
  )
);
