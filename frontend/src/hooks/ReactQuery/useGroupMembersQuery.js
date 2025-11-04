import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroupMembers } from '../../services/groups';

export function useGroupMembersQuery(group_id) {
  return useQuery({
    queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS, group_id],
    queryFn: async () => await getGroupMembers(group_id),
    staleTime: Infinity,
    enabled: !!group_id,
    placeholderData: { content: [] },
  });
}
