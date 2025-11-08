updateRoleGroupMember;
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRoleGroupMember } from '../../../services/groups';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';

export function useUpdateRoleGroupMemberMutation(groupID, page, search) {
  const queryClient = useQueryClient();

  return useMutation({
    // 🔧 Recebe os parâmetros e o payload com os novos dados
    mutationFn: async ({ group_id, member_id, newRole }) => {
      return await updateRoleGroupMember(group_id, member_id, newRole);
    },

    // ✅ Atualiza o cache após sucesso
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: search
          ? [REACTQUERY_KEYS.MEMBERS.ALL, Number(groupID), page, search]
          : [REACTQUERY_KEYS.MEMBERS.ALL, Number(groupID), page],
      });
      customToast(
        'Despesa atualizada com sucesso',
        'As informações da despesa foram salvas corretamente.',
        'success'
      );
    },

    // ⚠️ Exibe mensagem de erro, caso algo dê errado
    onError: error => {
      console.error('Erro ao definir um novo cargo para o membro:', error);
      customToast(
        'Erro ao atualizar membro para um novo cargo',
        'Não foi possível salvar as alterações. Tente novamente.',
        'error'
      );
    },
  });
}
