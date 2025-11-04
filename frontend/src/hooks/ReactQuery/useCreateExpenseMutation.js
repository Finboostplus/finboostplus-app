import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { createExpense } from '../../services/expenses';

export function useCreateExpenseMutation(groupID) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseData => createExpense(groupID, expenseData),
    onSuccess: () => {
      // Atualiza apenas as despesas do grupo específico
      queryClient.invalidateQueries([REACTQUERY_KEYS.GROUPS.EXPENSES, groupID]);
    },
  });
}
