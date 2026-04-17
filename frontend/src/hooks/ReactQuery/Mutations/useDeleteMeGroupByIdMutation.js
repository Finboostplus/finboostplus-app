import { useMutation } from '@tanstack/react-query';
import { leaveGroup } from '../../../services/groups';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { customToast } from '../../../components/CustomToast';
import { redirect } from 'react-router';

export function useDeleteMeGroupByIdMutation(group_id) {
  return useMutation({
    mutationFn: () => leaveGroup(group_id),
    onSuccess: () => {
      // Invalida a lista de grupos para forçar um refetch
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'page'],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail', Number(group_id)],
      });
      queryClient.invalidateQueries([
        REACTQUERY_KEYS.GROUPS.MEMBERS,
        Number(id),
      ]);

      // Opcional: remover manualmente do cache local
      queryClient.setQueryData([REACTQUERY_KEYS.GROUPS.ALL], oldData => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.filter(group => group.id !== id),
          totalElements: oldData.totalElements - 1,
        };
      });

      customToast('Saída', 'Saída do grupo efetuada com sucesso', 'success');
      redirect('/groups');
    },
    onError: error => {
      customToast(
        'Erro',
        error.response.data.message || 'Erro ao sair do grupo.',
        'error'
      );
    },
  });
}
