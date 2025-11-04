import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMembers } from '../../services/groups';

export const useMembersQuery = (groupID, page, search) => {
  return useQuery({
    queryKey: search
      ? [REACTQUERY_KEYS.MEMBERS.ALL, groupID, page, search]
      : [REACTQUERY_KEYS.MEMBERS.ALL, groupID, page],
    queryFn: () => getMembers(groupID, page, search),
    placeholderData: [],
    enabled: !!groupID && page >= 0,
  });
};
