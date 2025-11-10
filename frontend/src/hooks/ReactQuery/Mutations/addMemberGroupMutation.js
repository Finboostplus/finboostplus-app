import { useMutation } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { addMemberGroup } from '../../../services/groups';
import { customToast } from '../../../components/CustomToast';

export function addMemberGroupMutation(group_id) {
  return useMutation({
    mutationFn: data => addMemberGroup(group_id, data),
    onSuccess: response => {
      // Invalida a lista de grupos para forçar um refetch
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [REACTQUERY_KEYS.GROUPS.EXPENSES],
      });
      queryClient.invalidateQueries([
        REACTQUERY_KEYS.GROUPS.MEMBERS,
        Number(group_id),
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

      customToast('Adição de um novo membro', response, 'success');
    },
    onError: error => {
      customToast(
        'Erro',
        error.response.data.message || 'Erro ao convidar um novo membro grupo.',
        'error'
      );
    },
  });
}
