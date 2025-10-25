import { apiApplication } from './api';

export const getMe = async () => {
  try {
    let response = await apiApplication.get('user/me');
    const expenses = await apiApplication.get('user/me/expenses');
    response.data['totalExpenses'] = expenses.data.content || 0.0;
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter dados do usuário');
  }
};
export const updateMe = async data => {
  try {
    await apiApplication.put('/user', data);
  } catch (error) {
    throw new Error('Erro ao atualizar os dados do usuário');
  }
};
