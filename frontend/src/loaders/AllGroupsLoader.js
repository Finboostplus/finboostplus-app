import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { queryClient } from '../libs/ReactQuery/main';
import { getGroups } from '../services/groups';

export async function getAllGroupsLoader() {
  return queryClient.ensureQueryData({
    queryKey: [REACTQUERY_KEYS.GROUPS.ALL],
    queryFn: getGroups,
  });
}
