import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroupExpensesById, getGroups } from '../../services/groups';

export function useGroupsQuery(page = 0, size = 10) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL, page],
    queryFn: async () => await getGroups(page, size),
    staleTime: Infinity,
    placeholderData: { content: [] },
  });
}
export function useGroupExpenseByIdQuery(id) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL, id],
    enabled: !!id,
    queryFn: async () => await getGroupExpensesById(id),
    staleTime: Infinity,
    placeholderData: { content: [] },
  });
}
