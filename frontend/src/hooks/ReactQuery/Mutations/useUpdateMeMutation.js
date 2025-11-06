import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { updateMe } from '../../../services/me';

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
