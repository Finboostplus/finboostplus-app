import { REACTQUERY_KEYS } from '../../../libs/ReactQuery/keys';
import { queryClient } from '../../../libs/ReactQuery/queryClient';
import { apiApplication } from '../../../services/api';
import { getGroups } from '../../../services/groups';

// Função para buscar do servidor
async function fetchGroup() {
  const { data } = await getGroups();
  return data;
}

export async function groupDetailsLoader({ params }) {
  const groupId = Number(params['group-id']);

  // 1️⃣ Tenta pegar do cache específico de detalhes
  let group = queryClient.getQueryData([
    REACTQUERY_KEYS.GROUPS.DETAILS,
    groupId,
  ]);

  // 2️⃣ Se não existir, tenta filtrar do cache da lista
  if (!group) {
    const groupsData = queryClient.getQueryData([REACTQUERY_KEYS.GROUPS.ALL]);
    group = groupsData?.content?.find(g => g.id === groupId);

    // Se encontrou na lista, cria cache específico para detalhes
    if (group) {
      queryClient.setQueryData(
        [REACTQUERY_KEYS.GROUPS.DETAILS, groupId],
        group
      );
    }
  }

  // 3️⃣ Se ainda não tiver, busca do servidor e popula o cache de detalhes
  if (!group) {
    try {
      group = await fetchGroup();
      queryClient.setQueryData([REACTQUERY_KEYS.GROUPS.ALL], group);
    } catch (err) {
      throw new Response('Grupo não encontrado', { status: 404 });
    }
  }

  return group;
}
