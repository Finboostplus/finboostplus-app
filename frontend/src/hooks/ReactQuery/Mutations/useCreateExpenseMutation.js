import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { createExpense } from '../../../services/expenses';

export function useCreateExpenseMutation(groupID) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseData => createExpense(groupID, expenseData),

    onSuccess: (_response, expenseData) => {
      console.log({ expenseData, groupID });
      // 1. Invalida os detalhes do Grupo ESPECÍFICO (passando o ID)
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail', Number(groupID)],
      });

      // OU:
      // 1. Invalida QUALQUER detalhe de grupo
      // queryClient.invalidateQueries({
      //   queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail'],
      // });

      // 2. Invalida as queries de EXPENSES com 'filters'
      // Certifique-se de que a queryKey de leitura para despesas está correta.
      // Se ela usa o groupID, inclua o ID aqui:
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.EXPENSES, 'filters', Number(groupID)],
      });

      // Se a chave de despesas é genérica:
      // queryClient.invalidateQueries({
      //   queryKey: [REACTQUERY_KEYS.GROUPS.EXPENSES],
      // });
    },
  });
}
