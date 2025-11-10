import { useNavigate } from 'react-router';
import { useAuthStore } from '../context/stores/auth';
import {
  localStoragePersistor,
  queryClient,
} from '../libs/ReactQuery/queryClient';

export function useLogout() {
  const navigate = useNavigate();
  const resetStore = useAuthStore(state => state.reset);

  const handleLogout = async (redirectTo = '/login') => {
    try {
      // Limpa estado em memória
      resetStore?.();
      // Limpa estado persistido (se existir)
      if (useAuthStore.persist?.clearStorage) {
        useAuthStore.persist.clearStorage();
      }
      queryClient.clear();
      await localStoragePersistor.removeClient();
      // Redireciona sempre para login
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      // Em caso de erro, ainda tenta redirecionar
      navigate(redirectTo, { replace: true });
    }
  };

  return handleLogout;
}
