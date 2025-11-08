import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGroup } from '../../../services/groups';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';

export function useUpdateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    // 🔧 Recebe os parâmetros e o payload com os novos dados
    mutationFn: async ({ group_id, data }) => {
      return await updateGroup(group_id, data);
    },

    // ✅ Atualiza o cache após sucesso
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
      });

      customToast(
        'Grupo atualizado!',
        'As informações do grupo foram alteradas com sucesso.',
        'success'
      );
    },

    // ⚠️ Exibe mensagem de erro, caso algo dê errado
    onError: error => {
      console.error('Erro ao atualizar dados do grupo:', error);
      customToast(
        'Erro ao atualizar grupo',
        'Não foi possível salvar as alterações. Tente novamente.',
        'error'
      );
    },
  });
}
