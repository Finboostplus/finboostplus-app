import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMeExpenses } from '../../services/me';
import useMeQuery from './useMeQuery';

export default function useMeExpensesQuery(page) {
  const { data: user } = useMeQuery();
  const userId = user?.id;
  return useQuery({
    queryKey: [REACTQUERY_KEYS.USER.EXPENSES, { userId, page }],
    queryFn: async () => await getMeExpenses(page),
    enabled: !!userId,
    placeholderData: { expenses: [], totalPages: 0, expensesLength: 0 },
  });
}
