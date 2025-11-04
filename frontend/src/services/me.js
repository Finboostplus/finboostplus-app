import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { queryClient } from '../libs/ReactQuery/queryClient';
import { apiApplication } from './api';

export const getMe = async () => {
  try {
    let response = await apiApplication.get('user/me');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter dados do usuário');
  }
};

// A CHAVE [REACTQUERY_KEYS.USER.ME] deve ser onde a query de usuário está.
// Aqui, assumimos que a busca de usuário JÁ FOI FEITA.

export const getMeExpenses = async () => {
  // 1. Obter o userId do cache da query de usuário
  // Assumimos que o array de chaves do usuário é [REACTQUERY_KEYS.USER.ME]
  const user = queryClient.getQueryData([REACTQUERY_KEYS.USER.ME]);
  const userId = user?.id; // Usar optional chaining para segurança

  if (!userId) {
    // Isso deve ser impossível se você usar consultas dependentes (enabled: !!userId)
    throw new Error(
      'ID do usuário não encontrado no cache. A query de despesas foi executada muito cedo.'
    );
  }

  try {
    // 2. Chamada de API para obter as despesas
    const response = await apiApplication.get('user/me/expenses');
    const expensesList = response.data.content;

    // 3. NORMALIZAÇÃO: Injetar o dado na chave separada, que agora tem o ID
    // CHAVE: [REACTQUERY_KEYS.USER.EXPENSES, userId]
    queryClient.setQueryData(
      [REACTQUERY_KEYS.USER.EXPENSES, userId],
      expensesList
    );

    // 4. Retornar o dado (para a query principal)
    // OBS: Você pode retornar apenas a lista aqui, pois o setQueryData já lidou com o cache.
    return expensesList || [];
  } catch (error) {
    // É uma boa prática lançar o erro do próprio objeto de erro para que o TanStack Query o capture
    throw error;
  }
};

export const updateMe = async data => {
  try {
    await apiApplication.put('/user', data);
  } catch (error) {
    throw new Error('Erro ao atualizar os dados do usuário');
  }
};

export const getMeDashboardStats = async () => {
  try {
    const categories = await apiApplication.get(
      'user/me/classify-spending-by-category'
    );
    return categories.data;
  } catch (error) {
    throw new Error('Erro ao obter dados das despesas');
  }
};
