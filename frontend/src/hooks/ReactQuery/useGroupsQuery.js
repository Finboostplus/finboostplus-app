import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroups } from '../../services/groups';

export function useGroupsQuery() {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
    queryFn: getGroups,
    staleTime: Infinity,
    placeholderData: { content: [] },
  });
}
