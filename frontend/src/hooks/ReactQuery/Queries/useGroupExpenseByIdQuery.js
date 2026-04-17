import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { getGroupExpenseById } from '../../../services/groups';

export function useGroupExpenseByIdQuery(group_id, expense_id) {
  return useQuery({
    queryKey: [
      REACTQUERY_KEYS.GROUPS.EXPENSES,
      'groups',
      Number(group_id),
      Number(expense_id),
    ],
    enabled: !!group_id && !!expense_id,
    queryFn: async () => await getGroupExpenseById(group_id, expense_id),
    staleTime: Infinity,
    placeholderData: previousData => previousData ?? [],
  });
}
