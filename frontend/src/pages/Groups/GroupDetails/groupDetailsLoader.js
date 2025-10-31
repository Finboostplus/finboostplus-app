import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { getGroupById } from '../../../services/groups';

export async function groupDetailsLoader({ params, request }) {
  const { group_id } = params;

  // 3️⃣ Tenta pegar o grupo específico do cache de DETAILS
  let group = queryClient.getQueryData([
    REACTQUERY_KEYS.GROUPS.DETAILS,
    group_id,
  ]);

  // 6️⃣ Se ainda não achou, busca no servidor
  if (!group) {
    group = await queryClient.fetchQuery({
      queryKey: [REACTQUERY_KEYS.GROUPS.DETAILS, group_id],
      queryFn: () => getGroupById(group_id),
    });
  }

  console.log({ groupLoader: group });
  return group || 'Num achei';
}
