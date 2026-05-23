import { useEffect } from 'react';
import { useUiStore } from '@/store/uiStore';

export const useKeyboardShortcuts = () => {
  const { toggleTerminal, setActivePanel } = useUiStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal: Ctrl + ` or Ctrl + J
      if (e.ctrlKey && (e.key === '`' || e.key === 'j')) {
        e.preventDefault();
        toggleTerminal();
      }

      // Navigate panels: Alt + 1, 2, 3
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        setActivePanel('dashboard');
      }
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        setActivePanel('graph');
      }
      if (e.altKey && e.key === '3') {
        e.preventDefault();
        setActivePanel('terminal');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal, setActivePanel]);
};
