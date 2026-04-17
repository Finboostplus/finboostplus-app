import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpenseDetails } from '../../../services/groups';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';

export function useUpdateGroupExpenseByIdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    // 🔧 Recebe os parâmetros e o payload com os novos dados
    mutationFn: async ({ group_id, expense_id, data }) => {
      return await updateExpenseDetails(group_id, expense_id, data);
    },

    // ✅ Atualiza o cache após sucesso
    onSuccess: (_response, { group_id, expense_id }) => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.USER.EXPENSES, 'me'],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail', Number(group_id)],
      });

      customToast(
        'Despesa atualizada com sucesso',
        'As informações da despesa foram salvas corretamente.',
        'success'
      );
    },

    // ⚠️ Exibe mensagem de erro, caso algo dê errado
    onError: error => {
      console.error('Erro ao atualizar despesa:', error);
      customToast(
        'Erro ao atualizar despesa',
        'Não foi possível salvar as alterações. Tente novamente.',
        'error'
      );
    },
  });
}
