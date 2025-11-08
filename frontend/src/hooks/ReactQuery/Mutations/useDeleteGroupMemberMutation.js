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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.MEMBERS.ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
      });
      customToast('Membro removido', 'Membro removido com sucesso.', 'success');
    },
    onError: () => {
      customToast(
        'Erro ao excluir o membro do grupo',
        'Não foi possível excluir o membro do grupo. Tente novamente.',
        'error'
      );
    },
  });
}
