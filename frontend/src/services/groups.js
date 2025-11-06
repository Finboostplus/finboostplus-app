import { apiApplication } from './api';

// Busca todos os grupos
export const getGroups = async (page = 0, size = 6) => {
  try {
    const response = await apiApplication.get(
      `/groups?page=${page}&size=${size}`
    );
    return {
      groups: response.data.content,
      totalPages: response.data.totalPages,
      groupsLength: response.data.totalElements,
    };
  } catch (error) {
    throw error;
  }
};

//Obtém os membros de um grupo
export const getGroupMembers = async ({ groupId, page, size, search } = {}) => {
  const query = new URLSearchParams();
  if (page) query.append('page', page);
  if (size) query.append('size', size);
  if (search) query.append('search', search);

  const { data } = await apiApplication.get(
    `/groups/${groupId}/members?${query.toString()}`
  );

  return {
    members: data.content,
    totalPages: data.totalPages,
    totalElements: data.totalElements,
  };
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

//Obter um grupo por id
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
//Obter todas as categorias de despesa de um grupo
export const getAllGroupsExpenseCategories = async () => {
  try {
    const response = await apiApplication.get('/groups/expenses/categories');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao obter todas as categorias de despesa.');
  }
};

// Atualiza um grupo existente pelo id
export const updateGroup = async (id, group) => {
  const response = await api.put(`/groups/${id}`, group);

  return response.data;
};

// Remove um grupo pelo id
export const deleteGroup = async id => {
  try {
    const response = await apiApplication.delete(`/groups/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupExpenses = async ({ groupID, page, filter = null }) => {
  try {
    const query = new URLSearchParams({ size: 6, page: page.toString() });
    if (filter !== null) {
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            query.append(key, value.toString());
          }
        });
      }
    }

    const response = await apiApplication.get(
      `/groups/${groupID}/expenses?${query.toString()}`
    );
    return {
      expenses: response.data.content,
      totalPages: response.data.totalPages,
      expensesLength: response.data.totalElements,
    };
  } catch (error) {
    throw error;
  }
};

export const getGroupExpenseById = async (group_id, expense_id) => {
  try {
    const response = await apiApplication.get(
      `/groups/${group_id}/expenses/${expense_id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Erro ao obter uma despesa específica de um grupo - id da despesa e grupo:',
      expense_id,
      group_id
    );
  }
};
