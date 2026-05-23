import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ActivePanel = 'dashboard' | 'graph' | 'terminal' | 'settings' | 'report';

interface UiStore {
  sidebarOpen: boolean;
  activePanel: ActivePanel;
  terminalOpen: boolean;
  theme: 'dark' | 'light' | 'system';
  ecoMode: boolean;

  toggleSidebar: () => void;
  setActivePanel: (panel: ActivePanel) => void;
  toggleTerminal: () => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  toggleEcoMode: () => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      activePanel: 'dashboard',
      terminalOpen: false,
      theme: 'dark',
      ecoMode: false,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setActivePanel: (activePanel) => set({ activePanel }),
      toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
      setTheme: (theme) => set({ theme }),
      toggleEcoMode: () => set((state) => ({ ecoMode: !state.ecoMode })),
    }),
    {
      name: 'ghost-ui-store',
      partialize: (state) => ({ ecoMode: state.ecoMode }),
    }
  )
);
