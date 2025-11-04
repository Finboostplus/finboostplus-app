import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMeDashboardStats } from '../../services/me';

export function useMeDashboardQuery() {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.USER.DASHBOARD],
    queryFn: getMeDashboardStats,
    placeholderData: [],
  });
}
