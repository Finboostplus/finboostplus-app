import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { getGroupById, getGroupMembers } from '../../../services/groups';

export async function groupDetailsLoader({ params }) {
  const { group_id } = params;

  // 🔹 1. Tenta pegar o grupo do cache
  let group = queryClient.getQueryData([
    REACTQUERY_KEYS.GROUPS.DETAILS,
    group_id,
  ]);

  // 🔹 2. Se não tiver, busca e cacheia
  if (!group) {
    group = await queryClient.fetchQuery({
      queryKey: [REACTQUERY_KEYS.GROUPS.DETAILS, group_id],
      queryFn: () => getGroupById(group_id),
    });
  }

  // 🔹 3. Tenta pegar os membros do cache
  let members = queryClient.getQueryData([
    REACTQUERY_KEYS.GROUPS.MEMBERS,
    group_id,
  ]);

  // 🔹 4. Se não tiver no cache, busca e adiciona
  if (!members) {
    members = await queryClient.fetchQuery({
      queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS, group_id],
      queryFn: () => getGroupMembers(group_id),
      staleTime: Infinity,
    });
  }

  // 🔹 5. Combina grupo + membros antes de retornar
  const groupWithMembers = {
    ...group,
    members: members?.members || members || [],
  };
  console.log({ groupWithMembers });
  return groupWithMembers;
}
