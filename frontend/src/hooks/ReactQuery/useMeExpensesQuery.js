import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMeExpenses } from '../../services/me';
import useMeQuery from './useMeQuery';

export default function useMeExpensesQuery() {
  const { data: user } = useMeQuery();
  const userId = user?.id;
  return useQuery({
    queryKey: [REACTQUERY_KEYS.USER.EXPENSES, userId],
    queryFn: getMeExpenses,
    enabled: !!userId,
  });
}
