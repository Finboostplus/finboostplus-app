import { useMutation, useQueryClient } from '@tanstack/react-query';

import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';
import { deleteGroupMember } from '../../../services/groups';

export function useDeleteGroupMemberMutation(groupID, page, search) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ group_id, member_id }) => {
      return await deleteGroupMember(group_id, member_id);
    },
    onSuccess: (_response, { group_id }) => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.MEMBERS.ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS, group_id],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
      });
      customToast('Membro removido', 'Membro removido com sucesso.', 'success');
    },
    onError: error => {
      customToast(
        'Erro ao excluir o membro do grupo',
        error.response?.data?.message ||
          'Não foi possível excluir o membro do grupo. Tente novamente.',
        'error'
      );
    },
  });
}
