import { apiApplication } from './api';

// Busca todos os grupos
export const getGroups = async (page = 0, size = 6) => {
  try {
    const response = await apiApplication.get(
      `/groups?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupMembers = async (groupId, size = 4) => {
  try {
    const {
      data: { content: members, totalElements },
    } = await apiApplication.get(`groups/${groupId}/members?size=${size}`);
    console.log({ members });
    return { members, totalElements };
  } catch (error) {
    throw error;
  }
};

export const getMembers = async (groupId, page, search) => {
  try {
    const query = new URLSearchParams({ page: page.toString() });
    if (search) query.append('search', search);
    const response = await apiApplication.get(
      `/groups/${groupId}/members?${query.toString()}`
    );
    return {
      totalPages: response.data.totalPages,
      members: response.data.content,
    };
  } catch (error) {
    throw error;
  }
};

// Cria um novo grupo
export const createGroup = async group => {
  try {
    const response = await apiApplication.post('/groups', group);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao criar um grupo');
  }
};

export const getGroupById = async id => {
  try {
    const response = await apiApplication
      .get(`/groups/${id}`)
      .then(async ({ data: group }) => {
        const {
          data: { content: members },
        } = await apiApplication.get(`groups/${group.id}/members`);
        group.members = members;
        return group;
      });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao obter grupo - id:', id);
  }
};

// Atualiza um grupo existente pelo id
export const updateGroup = async (id, group) => {
  const response = await api.put(`/groups/${id}`, group);

  return response.data;
};

// Remove um grupo pelo id
export const deleteGroup = async id => {
  const response = await apiApplication.delete(`/groups/${id}`);
  return response.data;
};
