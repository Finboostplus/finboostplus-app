import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '../../../services/groups';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { useNavigate } from 'react-router';
import { customToast } from '../../../components/CustomToast';

export function useDeleteGroupMutation(id) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteGroup(id),
    onSuccess: () => {
      // Invalida a lista de grupos para forçar um refetch
      queryClient.invalidateQueries({
        predicate: query =>
          query.queryKey[0] === REACTQUERY_KEYS.GROUPS.ALL &&
          query.queryKey[1]?.groupID === id, // só o id importa
      });
      queryClient.invalidateQueries({
        predicate: query =>
          query.queryKey[0] === REACTQUERY_KEYS.GROUPS.EXPENSES &&
          query.queryKey[1]?.groupID === id, // só o id importa
      });
      queryClient.invalidateQueries([REACTQUERY_KEYS.GROUPS.MEMBERS, id]);

      // Opcional: remover manualmente do cache local
      queryClient.setQueryData([REACTQUERY_KEYS.GROUPS.ALL], oldData => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.filter(group => group.id !== id),
          totalElements: oldData.totalElements - 1,
        };
      });

      customToast('Exclusão', 'Grupo excluído com sucesso', 'success');
      navigate('/groups');
    },
    onError: error => {
      customToast(
        'Erro',
        error.response.data.message || 'Erro ao excluir grupo.',
        'error'
      );
    },
  });
}
