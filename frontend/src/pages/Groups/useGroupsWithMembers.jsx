import { useQueries } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroupMembers } from '../../services/groups';

//resumo dos membros na lista paginada
export default function useGroupsWithMembers(groups = []) {
  const membersQueries = useQueries({
    queries: groups.map(({ groupId }) => ({
      queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS, groupId],
      queryFn: () => getGroupMembers({ groupId, size: 4 }),
      enabled: !!groupId,
      staleTime: Infinity,
    })),
  });

  const membersMap = {};

  membersQueries.forEach((q, i) => {
    const groupId = groups[i]?.groupId;
    if (!groupId) return;

    membersMap[groupId] = q.data
      ? {
          totalElements: q.data.totalElements,
          members: q.data.members,
        }
      : {
          totalElements: 0,
          members: [],
        };
  });

  return membersMap;
}
