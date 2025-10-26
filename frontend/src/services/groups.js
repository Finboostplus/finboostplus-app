import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { queryClient } from '../libs/ReactQuery/queryClient';
import { apiApplication } from './api';

// Busca todos os grupos
export const getGroups = async (page, size) => {
  try {
    const userName = queryClient.getQueryData([REACTQUERY_KEYS.USER.ME]).name;
    const response = await apiApplication.get(
      `/groups?page=${page}&size=${size}`
    );

    // Para cada grupo, pega os membros
    const groupsWithMembers = await Promise.all(
      response.data.content.map(async group => {
        const { data: members } = await apiApplication.get(
          `groups/${group.id}/members`
        );
        members.some(member => {
          if (member.authority === 'OWNER') {
            if (member.name === userName) {
              group['ownerId'] = member.name;
            }
          }
        });
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
export const createGroup = async group => {
  try {
    const response = await apiApplication.post('/groups', group);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao criar um grupo');
  }
};

export const getGroupExpensesById = async id => {
  try {
    const response = await apiApplication.get(`/groups/${id}/expenses`);
    console.log(response);
    return response.data;
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
