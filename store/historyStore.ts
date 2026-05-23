import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HistoryEntry {
  id: string;
  target: string;
  type: 'domain' | 'ip' | 'email' | 'username';
  timestamp: number;
  threatScore: number;
  summary: string;
}

interface HistoryStore {
  history: HistoryEntry[];
  addHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],

      addHistory: (entry) => set((state) => {
        const newEntry: HistoryEntry = {
          ...entry,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
        };
        // Keep last 100 searches
        return { history: [newEntry, ...state.history].slice(0, 100) };
      }),

      removeHistory: (id) => set((state) => ({
        history: state.history.filter(h => h.id !== id)
      })),

      clearHistory: () => set({ history: [] })
    }),
    {
      name: 'ghost-trace-search-history',
    }
  )
);
