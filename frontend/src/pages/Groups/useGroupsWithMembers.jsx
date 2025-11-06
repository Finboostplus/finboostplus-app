import { useQueries } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroupMembers } from '../../services/groups';

export default function useGroupsWithMembers(groups) {
  // Cria queries dinâmicas de membros (cacheadas)
  const membersQueries = useQueries({
    queries: groups.map(group => ({
      queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS, group.id],
      queryFn: () => getGroupMembers({ groupId: group.id, size: 4 }),
      enabled: !!group.id,
      staleTime: Infinity, // mantém o cache fresco indefinidamente
    })),
  });
  // Cria um map: { [groupId]: members }
  const membersMap = {};
  membersQueries.forEach((q, i) => {
    if (q.data)
      membersMap[groups[i].id] = {
        totalElements: q.data.totalElements,
        members: q.data.members,
      };
  });

  return membersMap;
}
