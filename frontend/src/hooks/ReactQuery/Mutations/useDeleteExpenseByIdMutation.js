import { useMutation, useQueryClient } from '@tanstack/react-query';

import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';
import { deleteGroupExpense } from '../../../services/groups';

export function useDeleteExpenseByIdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ group_id, expense_id }) => {
      return await deleteGroupExpense(group_id, expense_id);
    },
    onSuccess: (_data, { group_id }) => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.USER.EXPENSES, 'me'],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail', Number(group_id)],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'page'],
      });

      customToast(
        'Despesa removida',
        'A despesa foi excluída com sucesso do grupo.',
        'success'
      );
    },
    onError: () => {
      customToast(
        'Erro ao excluir despesa',
        'Não foi possível excluir a despesa. Tente novamente.',
        'error'
      );
    },
  });
}
