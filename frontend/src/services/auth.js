import api from "./api";

// Função de login que envia email e senha para a API
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  
  return response.data;
};

// Registro de usuário que envia nome, email e senha
export const register = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });

  return response.data;
};

// Encerra a sessão do usuário
export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// Atualiza o token de autenticação
export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");

  return response.data;
};
