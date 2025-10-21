import { queryClient } from '../libs/ReactQuery/main';
import { getGroups } from '../services/groups';
export const GROUPS_KEY = 'allGroups';
export async function getAllGroupsLoader() {
  return queryClient.ensureQueryData({
    queryKey: [GROUPS_KEY],
    queryFn: getGroups,
  });
}
