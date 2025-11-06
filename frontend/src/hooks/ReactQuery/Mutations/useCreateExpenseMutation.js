import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense } from '../../../services/expenses';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';

export function useCreateExpenseMutation(groupID) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseData => createExpense(groupID, expenseData),

    onSuccess: () => {
      // 🔄 Invalida TODAS as queries de despesas desse grupo
      queryClient.invalidateQueries({
        predicate: query => {
          const [key, params] = query.queryKey;

          return (
            key === REACTQUERY_KEYS.GROUPS.EXPENSES &&
            typeof params === 'object' &&
            params?.groupID === groupID
          );
        },
      });

      // 🔄 Atualiza listagem geral de grupos
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
      });
    },
  });
}
