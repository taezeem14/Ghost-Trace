import { create } from 'zustand';

type ActivePanel = 'dashboard' | 'graph' | 'terminal' | 'settings' | 'report';

interface UiStore {
  sidebarOpen: boolean;
  activePanel: ActivePanel;
  terminalOpen: boolean;
  theme: 'dark' | 'light' | 'system';
  
  toggleSidebar: () => void;
  setActivePanel: (panel: ActivePanel) => void;
  toggleTerminal: () => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  activePanel: 'dashboard',
  terminalOpen: false,
  theme: 'dark', // GhostTrace is strictly dark-themed by default!

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePanel: (activePanel) => set({ activePanel }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setTheme: (theme) => set({ theme }),
}));
