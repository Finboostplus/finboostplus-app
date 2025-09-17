import api from "./api";

// Busca um usuário pelo ID// Busca um usuário pelo id
export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  
  return response.data;
};

// Atualiza os dados de um usuário
export const updateUser = async (id, user) => {
  const response = await api.put(`/users/${id}`, user);

  return response.data;
};

// Remove um usuário pelo id
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};

// Busca todos os usuários
export const getAllUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};
