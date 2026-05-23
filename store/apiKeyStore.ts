import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApiKeys {
  shodan?: string;
  virustotal?: string;
  github?: string;
  hibp?: string;
  alienvault?: string;
  censys?: string;
  hunter?: string;
}

interface ApiKeyStore {
  keys: ApiKeys;
  setKey: (service: keyof ApiKeys, key: string) => void;
  removeKey: (service: keyof ApiKeys) => void;
  clearAllKeys: () => void;
}

export const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set) => ({
      keys: {},

      setKey: (service, key) => set((state) => ({
        keys: { ...state.keys, [service]: key }
      })),

      removeKey: (service) => set((state) => {
        const newKeys = { ...state.keys };
        delete newKeys[service];
        return { keys: newKeys };
      }),

      clearAllKeys: () => set({ keys: {} })
    }),
    {
      name: 'ghost-trace-api-keys',
      // Note: For a production app, we should encrypt these keys before storing them in localStorage.
      // E.g., using CryptoJS to encrypt/decrypt using a user-provided master password.
    }
  )
);
