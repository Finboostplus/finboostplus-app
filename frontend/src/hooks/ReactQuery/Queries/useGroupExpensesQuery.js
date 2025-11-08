import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { getGroupExpenses } from '../../../services/groups';

export function useGroupExpensesQuery(groupID, page, filter) {
  // 1. Desestrutura as propriedades de filtro para uso no queryKey
  // Assumimos que 'status' e 'allGroupMembersExpenses' são as chaves
  // que podem vir do objeto 'filter'.
  const { status, allGroupMembersExpenses } = filter;

  return useQuery({
    // 2. O queryKey agora inclui explicitamente o 'status' e 'allGroupMembersExpenses'.
    // Uma mudança em qualquer um desses valores fará com que o array do queryKey mude,
    // forçando o TanStack Query a fazer uma nova busca (refetch).
    queryKey: [
      REACTQUERY_KEYS.GROUPS.EXPENSES,
      'filters',
      Number(groupID),
      page,
      status, // Chave do filtro 1
      allGroupMembersExpenses, // Chave do filtro 2 (se existir)
      ,
    ],

    // 3. A queryFn continua usando o objeto 'filter' completo para a chamada de API
    queryFn: async () => await getGroupExpenses({ groupID, page, filter }),
    staleTime: Infinity,
    // Configurações mantidas
    enabled: !!groupID,
    /* staleTime: Infinity, */
    placeholderData: previousData => previousData,
  });
}
