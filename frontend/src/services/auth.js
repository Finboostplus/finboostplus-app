import api from './api';

// Função de login que envia email e senha para a API
export const login = async (email, password) => {
  const response = await api.getToken(email, password);
  return response.data;
};

// Registro de usuário que envia nome, email e senha
export const register = async newUser => {
  const response = await api
    .post('/user', newUser)
    .then(response => {
      console.log('Usuário criado:', response.data);
    })
    .catch(error => {
      console.error('Erro ao criar usuário:', error);
    });

  return response.data;
};

// Encerra a sessão do usuário
export const logout = async () => {
  const response = await api.post('/auth/logout');

  return response.data;
};

// Atualiza o token de autenticação
export const refreshToken = async () => {
  const response = await api.post('/oauth2/token');

  return response.data;
};
