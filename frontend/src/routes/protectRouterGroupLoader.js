import { queryClient } from '../libs/ReactQuery/queryClient';
import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { getGroupMembers } from '../services/groups';
import { getMe } from '../services/me';

// Níveis de permissão necessários para acessar esta rota
const ROLES = ['OWNER'];

export async function protectRouterGroupLoader({ params }) {
  // --- 0. Declaração da variável userAuthority ---
  let userAuthority = null;

  // --- 1. Obtenção Segura de Dados e Conversão de Tipo ---
  let userData = queryClient.getQueryData([REACTQUERY_KEYS.USER.ME]);

  const rawGroupId = params.group_id;
  const groupId = Number(rawGroupId); // Garante que é um número

  // Tenta buscar o usuário autenticado se não estiver no cache
  if (!userData) {
    try {
      userData = await queryClient.fetchQuery({
        queryKey: [REACTQUERY_KEYS.USER.ME],
        queryFn: getMe,
      });
    } catch (error) {
      console.error('Falha ao buscar usuário autenticado:', error);
      throw new Response('Usuário não autenticado', {
        status: 401,
        statusText: 'Não autorizado',
      });
    }
  }

  // Garante que o objeto 'user' é extraído corretamente
  const user = userData.user || userData;
  const search = user.name;

  // Checagem básica de validade
  if (!user || !user.id || isNaN(groupId)) {
    console.error('Dados de usuário ou ID do grupo inválidos após busca.');
    throw new Response('Dados inválidos', {
      status: 400,
      statusText: 'Bad Request',
    });
  }

  // --- 2. Tenta ler a autoridade do cache (ou buscar) ---
  userAuthority = queryClient.getQueryData([
    REACTQUERY_KEYS.GROUPS.ME_AUTHORITY,
    groupId,
  ]);

  if (!userAuthority) {
    try {
      userAuthority = await queryClient.fetchQuery({
        queryKey: [REACTQUERY_KEYS.GROUPS.ME_AUTHORITY, groupId],
        queryFn: async () => {
          const { members } = await getGroupMembers({
            groupId: groupId,
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
  }

  // --- 3. Lógica de Proteção CORRETA usando some() ---
  const hasPermission = ROLES.some(role => role === userAuthority);

  if (hasPermission) {
    // ✅ SUCESSO: O usuário tem permissão. Retorna os dados necessários para a rota.
    return;
  }

  // ❌ FALHA: O usuário NÃO tem permissão (Role insuficiente).
  console.warn('Acesso negado. Nível de autorização insuficiente.');

  throw new Response(
    'Acesso negado. Você não tem a permissão necessária para esta página.',
    { status: 403, statusText: 'Acesso negado' }
  );
}
