import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { localStoragePersistor, queryClient } from './queryClient';

export default function QCProvider({ children }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersistor }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
