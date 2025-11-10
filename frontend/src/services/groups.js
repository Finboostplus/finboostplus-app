import { apiApplication } from './api';

export const getGroups = async (page, size) => {
  try {
    const params = new URLSearchParams();

    // adiciona parâmetros apenas se existirem
    if (page !== undefined) params.append('page', page);
    if (size !== undefined) params.append('size', size);

    const response = await apiApplication.get(`/groups?${params.toString()}`);

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
    size: data.size,
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
    const response = await apiApplication.get(`/groups/${id}`);
    /* .then(async ({ data: group }) => {
        const {
          data: { content: members },
        } = await apiApplication.get(`groups/${group.id}/members`);
        group.members = members;
        return group;
      }); */
    return response.data;
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
  try {
    const response = await apiApplication.put(`/groups/${id}`, group);
    return response.data;
  } catch (error) {
    throw error;
  }
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

export const updatePartialValueExpenseStatus = async (
  group_id,
  expense_id,
  member_id
) => {
  try {
    const response = await apiApplication.patch(
      `/groups/${group_id}/expenses/${expense_id}/member/${member_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExpenseDetails = async (group_id, expense_id, data) => {
  try {
    const response = await apiApplication.put(
      `/groups/${group_id}/expenses/${expense_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroupExpense = async (group_id, expense_id) => {
  try {
    const response = await apiApplication.delete(
      `/groups/${group_id}/expenses/${expense_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteGroupMember = async (group_id, member_id) => {
  try {
    const response = await apiApplication.delete(
      `/groups/${group_id}/members/${member_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoleGroupMember = async (group_id, member_id, newRole) => {
  try {
    const data = {
      setAuthority: newRole,
    };
    const response = await apiApplication.put(
      `/groups/${group_id}/members/${member_id}/transfer-ownership`,
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupUserAuthenticatedAuthority = async (group_id, userId) => {
  try {
    const response = await apiApplication.get(
      `/groups/${group_id}/members/${userId}/authority`
    );
    return response.data.authority;
  } catch (error) {
    throw error;
  }
};
