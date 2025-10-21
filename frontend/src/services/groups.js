import { apiApplication } from './api';

// Busca todos os grupos
export const getGroups = async () => {
  try {
    const response = await apiApplication.get('/groups');

    // Para cada grupo, pega os membros
    const groupsWithMembers = await Promise.all(
      response.data.content.map(async group => {
        const { data: members } = await apiApplication.get(
          `groups/${group.id}/members`
        );
        return { ...group, members }; // adiciona members ao grupo
      })
    );

    // Retorna o objeto original, mas com grupos já populados
    return { ...response.data, content: groupsWithMembers };
  } catch (error) {
    throw error;
  }
};

// Cria um novo grupo
export const addGroup = async group => {
  const response = await api.post('/groups', group);

  return response.data;
};

// Atualiza um grupo existente pelo id
export const updateGroup = async (id, group) => {
  const response = await api.put(`/groups/${id}`, group);

  return response.data;
};

// Remove um grupo pelo id
export const deleteGroup = async id => {
  const response = await api.delete(`/groups/${id}`);

  return response.data;
};
