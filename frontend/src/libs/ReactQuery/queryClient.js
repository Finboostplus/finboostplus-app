import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { SecureLS } from '../../utils/localStorageEncryption';

const refetchInterval = 180000; // 3 minutos

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchInterval,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});

export const localStoragePersistor = createAsyncStoragePersister({
  storage: {
    getItem: key => {
      try {
        return SecureLS.get(key);
      } catch {
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        SecureLS.set(key, value);
      } catch (e) {
        console.error('Erro ao criptografar cache:', e);
      }
    },
    removeItem: key => {
      SecureLS.remove(key);
    },
  },
  key: 'finboost-cache',
});
