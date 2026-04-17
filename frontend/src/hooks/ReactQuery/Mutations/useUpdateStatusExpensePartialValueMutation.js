import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePartialValueExpenseStatus } from '../../../services/groups';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';

export function useUpdateStatusExpensePartialValueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ group_id, expense_id, member_id }) => {
      return await updatePartialValueExpenseStatus(
        group_id,
        expense_id,
        member_id
      );
    },
    onSuccess: (updatedMember, { group_id, expense_id, member_id }) => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.USER.EXPENSES, 'me'],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail', Number(group_id)],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'page'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          REACTQUERY_KEYS.GROUPS.EXPENSES,
          'filters',
          Number(group_id),
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          REACTQUERY_KEYS.GROUPS.EXPENSES,
          'groups',
          Number(group_id),
          Number(expense_id),
        ],
      });
      customToast(
        'Status atualizado',
        'O status da despesa do participante foi alterado com sucesso.',
        'success'
      );
    },
    onError: () => {
      customToast(
        'Erro ao atualizar',
        'Não foi possível alterar o status da despesa. Tente novamente.',
        'error'
      );
    },
  });
}
