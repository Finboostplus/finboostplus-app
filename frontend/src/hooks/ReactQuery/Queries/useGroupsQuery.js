import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { getGroupById, getGroups } from '../../../services/groups';

export function useGroupsQuery(page = 0) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'page', page],
    queryFn: async () => await getGroups(page),
    staleTime: Infinity,
    placeholderData: {
      groups: [],
      totalPages: 0,
      groupsLength: 0,
    },
  });
}

export function useGroupByIdQuery(id) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL, 'detail', Number(id)],
    enabled: !!id,
    queryFn: async () => await getGroupById(id),
    staleTime: Infinity,
    placeholderData: {},
  });
}
