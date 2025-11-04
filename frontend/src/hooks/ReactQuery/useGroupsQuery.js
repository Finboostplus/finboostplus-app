import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroupById, getGroups } from '../../services/groups';

export function useGroupsQuery(page, size) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL, { page, size }],
    queryFn: async () => await getGroups(page, size),
    staleTime: Infinity,
    placeholderData: { content: [] },
  });
}
export function useGroupByIdQuery(id) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL, id],
    enabled: !!id,
    queryFn: async () => await getGroupById(id),
    staleTime: Infinity,
    placeholderData: { content: {} },
  });
}
