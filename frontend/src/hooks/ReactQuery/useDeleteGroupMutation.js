import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { deleteGroup } from '../../services/groups';

export function useDeleteGroupMutation(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteGroup(id),
    onSuccess: () => {
      // Invalida a lista de grupos para forçar um refetch
      queryClient.invalidateQueries([REACTQUERY_KEYS.GROUPS.ALL]);

      // Opcional: remover manualmente do cache local
      queryClient.setQueryData([REACTQUERY_KEYS.GROUPS.ALL], oldData => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.filter(group => group.id !== id),
          totalElements: oldData.totalElements - 1,
        };
      });
    },
  });
}
