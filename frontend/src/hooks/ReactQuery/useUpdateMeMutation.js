import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '../../services/me';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: data => {
      queryClient.setQueryData([REACTQUERY_KEYS.USER.ME], data);
      queryClient.invalidateQueries([REACTQUERY_KEYS.USER.ME]);
    },
  });
}
