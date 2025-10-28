import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { SecureLS } from '../../utils/localStorageEncryption';
export const queryClient = new QueryClient();

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
