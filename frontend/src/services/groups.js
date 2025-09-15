import api from "./api";

// Busca todos os grupos
export const getGroups = async () => {
  const response = await api.get("/groups");

  return response.data;
};

// Cria um novo grupo
export const addGroup = async (group) => {
  const response = await api.post("/groups", group);

  return response.data;
};

// Atualiza um grupo existente pelo id
export const updateGroup = async (id, group) => {
  const response = await api.put(`/groups/${id}`, group);

  return response.data;
};

// Remove um grupo pelo id
export const deleteGroup = async (id) => {
  const response = await api.delete(`/groups/${id}`);

  return response.data;
};
