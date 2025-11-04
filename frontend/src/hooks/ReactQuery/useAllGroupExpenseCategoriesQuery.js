import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getAllGroupsExpenseCategories } from '../../services/groups';

export function useAllGroupExpenseCategoriesQuery() {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.EXPENSES.CATEGORIES],
    queryFn: getAllGroupsExpenseCategories,
    staleTime: Infinity,
    placeholderData: [],
  });
}
