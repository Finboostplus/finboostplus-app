import api from './api';
import { isAxiosError } from 'axios';

// Função de login que envia email e senha para a API
export const login = ({ username, password }) => {
  const config = {
    headers: {
      // Cabeçalho para o corpo da requisição
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return api
    .post(
      'oauth2/token',
      { username, password, grant_type: 'password' },
      config
    )
    .then(({ data }) => ({ success: true, value: data }))
    .catch(error => {
      let success = false,
        title;

      let { code, message } = error;

      message = message || 'Ocorreu um erro no servidor.';

      if (isAxiosError(error)) {
        if (error.response) {
          title = 'Erro: ';
          // O servidor respondeu com um status code 4xx ou 5xx
          throw { success, title, error: message };
        } else if (error.request) {
          // A requisição foi feita, mas nenhuma resposta foi recebida (geralmente erro de rede)
          title = 'Erro(' + code + '): ' + 'Erro de conexão ou timeout';
          message =
            'Verifique sua conexão com a internet ou tente novamente mais tarde.';

          throw { success, title, error: message };
        } else {
          // Algo aconteceu ao configurar a requisição (erro de código do lado do cliente)
          title = 'Erro de configuração da requisição:';
          throw { success, title, error: message };
        }
      } else {
        title = 'Erro inesperado: ';
        throw { success, title, error: message };
      }
    });
};

// Registro de usuário que envia nome, email e senha
export const register = data => {
  return api
    .post('/user', data)
    .then(({ data }) => ({ success: true, value: data }))
    .catch(error => {
      let success = false,
        title;

      let { code, message } = error;
      message = message || 'Ocorreu um erro no servidor.';

      if (isAxiosError(error)) {
        if (error.response) {
          title = 'Erro:';
          // O servidor respondeu com um status code 4xx ou 5xx
          throw { success, title, error: message };
        } else if (error.request) {
          // A requisição foi feita, mas nenhuma resposta foi recebida (geralmente erro de rede)
          title = 'Erro(' + code + '): ' + 'Erro de conexão ou timeout';
          message =
            'Verifique sua conexão com a internet ou tente novamente mais tarde.';
          throw { success, title, error: message };
        } else {
          // Algo aconteceu ao configurar a requisição (erro de código do lado do cliente)
          title = 'Erro de configuração da requisição:';
          throw { success, title, error: message };
        }
      } else {
        title = 'Erro inesperado: ';
        throw { success, title, error: message };
      }
    });
};

// Encerra a sessão do usuário
export const logout = async () => {
  const response = await api.post('/auth/logout');

  return response.data;
};

// Atualiza o token de autenticação
export const refreshToken = async () => {
  const response = await api.post('/auth/refresh');

  return response.data;
};
