import { ReactQuery_keys } from '../libs/ReactQuery/keys';
import { queryClient } from '../libs/ReactQuery/main';
import { getGroups } from '../services/groups';

export async function getAllGroupsLoader() {
  return queryClient.ensureQueryData({
    queryKey: [ReactQuery_keys.groups.all],
    queryFn: getGroups,
  });
}
