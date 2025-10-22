import { isAxiosError } from 'axios';
import { apiAuthentication } from './api';

// Função de login que envia email e senha para a API
export const login = ({ username, password }) => {
  const config = {
    headers: {
      // Cabeçalho para o corpo da requisição
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return apiAuthentication
    .post(
      'oauth2/token',
      { username, password, grant_type: 'password' },
      config
    )
    .then(({ data }) => ({ value: data }))
    .catch(error => {
      let title = 'Erro';
      let message = 'Ocorreu um erro inesperado.';

      if (isAxiosError(error)) {
        // --- Caso 1: O servidor respondeu com status 4xx ou 5xx ---
        if (error.response) {
          const status = error.response.status;
          const serverMessage =
            error.response.data?.message ||
            error.response.data?.error ||
            error.message;

          title = `Erro ${status}`;
          message = serverMessage || 'Erro ao processar sua solicitação.';

          // --- Caso 2: Requisição feita, mas sem resposta (problema de rede, timeout, CORS) ---
        } else if (error.request) {
          title = 'Erro de Conexão';
          message =
            'Não foi possível se conectar ao servidor. Verifique sua internet e tente novamente.';

          // --- Caso 3: Algo deu errado na configuração da requisição ---
        } else {
          title = 'Erro Interno';
          message =
            'Houve um problema ao preparar a requisição. Tente novamente mais tarde.';
        }

        // --- Caso 4: Erro não relacionado ao Axios ---
      } else {
        title = 'Erro Desconhecido';
        message = (error && error.message) || 'Ocorreu um erro inesperado.';
      }

      // Retorna de forma padronizada
      throw {
        title,
        error: message,
      };
    });
};

// Registro de usuário que envia nome, email e senha
export const register = async data => {
  try {
    const { data: result } = await apiAuthentication.post('/user', data);
    return { value: result };
  } catch (error) {
    let title = 'Erro';
    let message = 'Ocorreu um erro inesperado.';

    if (isAxiosError(error)) {
      // --- Caso 1: O servidor respondeu com status 4xx ou 5xx ---
      if (error.response) {
        const status = error.response.status;
        const serverMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          error.message;

        title = `Erro ${status}`;
        message = serverMessage || 'Erro ao processar sua solicitação.';

        // --- Caso 2: Requisição feita, mas sem resposta (problema de rede, timeout, CORS) ---
      } else if (error.request) {
        title = 'Erro de Conexão';
        message =
          'Não foi possível se conectar ao servidor. Verifique sua internet e tente novamente.';

        // --- Caso 3: Algo deu errado na configuração da requisição ---
      } else {
        title = 'Erro Interno';
        message =
          'Houve um problema ao preparar a requisição. Tente novamente mais tarde.';
      }

      // --- Caso 4: Erro não relacionado ao Axios ---
    } else {
      title = 'Erro Desconhecido';
      message = (error && error.message) || 'Ocorreu um erro inesperado.';
    }

    // Retorna de forma padronizada
    throw {
      title,
      error: message,
    };
  }
};

// Encerra a sessão do usuário
export const logout = async () => {
  const response = await apiAuthentication.post('/auth/logout');

  return response.data;
};

// Atualiza o token de autenticação
export const refreshToken = async refresh_token => {
  try {
    const config = {
      headers: {
        // Cabeçalho para o corpo da requisição
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await apiAuthentication.post(
      '/oauth2/token',
      {
        refresh_token,
        grant_type: 'refresh_token',
      },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
