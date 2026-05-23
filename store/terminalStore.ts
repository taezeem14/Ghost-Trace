import { create } from 'zustand';

export type TerminalMessageType = 'input' | 'output' | 'error' | 'system' | 'success' | 'warning';

export interface TerminalEntry {
  id: string;
  type: TerminalMessageType;
  content: string;
  timestamp: number;
}

interface TerminalStore {
  history: TerminalEntry[];
  isProcessing: boolean;
  
  addEntry: (type: TerminalMessageType, content: string) => void;
  clearHistory: () => void;
  setProcessing: (isProcessing: boolean) => void;
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  history: [
    {
      id: 'init-1',
      type: 'system',
      content: 'GhostTrace OSINT Engine v1.0.0 initialized.',
      timestamp: Date.now(),
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Type "help" for a list of available commands.',
      timestamp: Date.now(),
    }
  ],
  isProcessing: false,

  addEntry: (type, content) => set((state) => ({
    history: [
      ...state.history,
      { id: Math.random().toString(36).substring(2, 9), type, content, timestamp: Date.now() }
    ]
  })),

  clearHistory: () => set({ history: [] }),
  
  setProcessing: (isProcessing) => set({ isProcessing })
}));
