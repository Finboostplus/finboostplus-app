import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { getGroups } from '../../../services/groups';

export async function groupDetailsLoader({ params, request }) {
  const { group_id } = params;

  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const size = url.searchParams.get('size');
  return { group_id, page, size };
  // 1️⃣ Tenta pegar o cache dos grupos (paginado)
  let allGroups = queryClient.getQueryData([REACTQUERY_KEYS.GROUPS.ALL, page]);

  // 2️⃣ Se não existir, busca do servidor e popula o cache
  if (!allGroups) {
    allGroups = await queryClient.fetchQuery({
      queryKey: [REACTQUERY_KEYS.GROUPS.ALL, page, size],
      queryFn: () => getGroups(page, size),
    });
  }

  // 3️⃣ Tenta pegar o grupo específico do cache de DETAILS
  let group = queryClient.getQueryData([
    REACTQUERY_KEYS.GROUPS.DETAILS,
    group_id,
  ]);

  // 4️⃣ Se não tiver cache específico, tenta encontrar dentro de ALL
  if (!group && allGroups?.content) {
    group = allGroups.content.find(g => String(g.id) === String(group_id));

    // 5️⃣ Se encontrou dentro de ALL, cria um cache separado para DETAILS
    if (group) {
      queryClient.setQueryData(
        [REACTQUERY_KEYS.GROUPS.DETAILS, group_id],
        group
      );
    }
  }

  // 6️⃣ Se ainda não achou, busca no servidor
  if (!group) {
    group = await queryClient.fetchQuery({
      queryKey: [REACTQUERY_KEYS.GROUPS.DETAILS, group_id],
      queryFn: () => getGroupById(group_id),
    });
  }

  return group;
}
