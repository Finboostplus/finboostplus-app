import { useAuthStore } from '../context/stores/auth';
import {
  localStoragePersistor,
  queryClient,
} from '../libs/ReactQuery/queryClient';
import { getRefreshToken } from './auth';

export const refreshAuthLogic = async failedRequest => {
  const {
    refreshToken,
    setRefreshToken,
    reset: resetStore,
  } = useAuthStore.getState();
  try {
    // 🔒 Verifica se há um refresh token salvo
    if (!refreshToken) {
      throw new Error('Refresh Token não disponível.');
    }

    // ⚙️ Chama a função que solicita um novo token de acesso
    const newCredentials = await getRefreshToken(refreshToken);
    setRefreshToken(newCredentials);

    console.log('🔄 Token de acesso renovado com sucesso');
    return failedRequest; // Retorna a requisição original para retry
  } catch (error) {
    console.error('🚨 Erro no refreshAuthLogic:', error);

    // ⚠️ Caso o erro venha da API
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || status === 403) {
        console.warn('❌ Token expirado ou inválido. Deslogando usuário...');
      } else {
        console.warn(
          `❗ Erro de API (${status}):`,
          data?.message || 'Erro desconhecido'
        );
      }
    }
    // 🕸️ Caso seja erro de rede
    else if (error.request) {
      console.error(
        'Error',
        '🌐 Falha na comunicação com o servidor. Verifique a conexão.',
        'error'
      );
    }
    // 🧩 Erros inesperados (ex: código malformado)
    else {
      console.error(
        'Error',
        `⚠️ Erro inesperado: ${error.message || error}`,
        'error'
      );
    }

    // Sempre retorna a requisição com o erro original tratado
    return Promise.reject(error).finally(async () => {
      resetStore?.();
      queryClient.clear();
      await localStoragePersistor.removeClient();
      window.location.href = '/login';
    });
  }
};
