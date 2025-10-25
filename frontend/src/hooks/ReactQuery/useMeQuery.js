import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMe } from '../../services/me';

export default function useMeQuery() {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.USER.ME],
    queryFn: getMe,
    staleTime: Infinity,
  });
}
