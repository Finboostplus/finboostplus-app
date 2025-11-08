import { useQuery } from '@tanstack/react-query';

import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { getGroupMembers } from '../../../services/groups';

export const useMembersQuery = (groupID, page, search) => {
  return useQuery({
    queryKey: search
      ? [REACTQUERY_KEYS.MEMBERS.ALL, 'page', Number(groupID), page, search]
      : [REACTQUERY_KEYS.MEMBERS.ALL, 'page', Number(groupID), page],
    queryFn: () => getGroupMembers({ groupId: groupID, page, search }),
    placeholderData: [],
    enabled: !!groupID,
  });
};
