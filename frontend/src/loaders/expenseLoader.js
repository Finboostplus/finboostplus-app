import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { queryClient } from '../libs/ReactQuery/queryClient';
import { getGroupUserAuthenticatedAuthority } from '../services/groups';
import { getMe } from '../services/me';

export async function expenseLoader({ params }) {
  const { group_id } = params;

  // Pega o usuário logado
  const user = await queryClient.ensureQueryData({
    queryKey: [REACTQUERY_KEYS.USER.ME],
    queryFn: getMe,
    staleTime: Infinity,
  });

  // Pega autoridade do usuário no grupo
  const authority = await queryClient.ensureQueryData({
    queryKey: [REACTQUERY_KEYS.GROUPS.ME_AUTHORITY, group_id, user.id],
    queryFn: () => getGroupUserAuthenticatedAuthority(group_id, user.id),
  });

  return authority;
}
