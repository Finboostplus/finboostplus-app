import { useAuthorityStore } from '../../../context/stores/auth';
import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { getGroupMembers } from '../../../services/groups';

export async function groupDetailsLoader({ params }) {
  let userAuthority = null;
  const { group_id } = params;
  const { setAuthority } = useAuthorityStore.getState();
  const data = queryClient.getQueryData([REACTQUERY_KEYS.USER.ME]);
  const search = data?.name;
  try {
    userAuthority = await queryClient.fetchQuery({
      queryKey: [REACTQUERY_KEYS.GROUPS.ME_AUTHORITY, group_id],
      queryFn: async () => {
        const { members } = await getGroupMembers({
          groupId: group_id,
          search: search,
        });
        if (members && members.length > 0) {
          return members[0].authority;
        }
        throw new Error('Membro não encontrado no grupo.');
      },
    });
  } catch (error) {
    console.error('Falha ao buscar autoridade do membro:', error);
    throw new Response('Acesso negado. Você não é membro deste grupo.', {
      status: 403,
      statusText: 'Acesso negado',
    });
  }
  if (userAuthority) {
    setAuthority(group_id, userAuthority);
  }
  return;
}
