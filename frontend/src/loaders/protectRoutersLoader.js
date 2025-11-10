import { matchPath, redirect } from 'react-router';
import { useAuthStore } from '../context/stores/auth';
import { queryClient } from '../libs/ReactQuery/queryClient';
import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { getGroupUserAuthenticatedAuthority } from '../services/groups';
import { getMe } from '../services/me';
import { ForbiddenError } from '../utils/errors';

export async function protectRoutersLoader({ request, params }) {
  // 🔐 1. Proteção de login
  await useAuthStore.persist.rehydrate();
  const isAuthenticated = !!useAuthStore.getState().token;

  if (!isAuthenticated) {
    // Redireciona para login se não estiver autenticado
    return redirect('/login');
  }

  // 🧩 2. Verifica se é rota de configuração de grupo
  const { group_id } = params;
  const url = new URL(request.url);
  const path = url.pathname;

  // Só bloqueia /groups/:group_id/settings e subrotas
  const match = matchPath(`/groups/${group_id}/settings/*`, path);
  if (!match) return null; // rota livre → prossegue

  // 🧠 3. Obtém o usuário logado
  const user = await queryClient.ensureQueryData({
    queryKey: [REACTQUERY_KEYS.USER.ME],
    queryFn: getMe,
    staleTime: Infinity,
  });

  // 👑 4. Obtém a autoridade do usuário no grupo
  const authority = await queryClient.ensureQueryData({
    queryKey: [REACTQUERY_KEYS.GROUPS.ME_AUTHORITY, group_id, user.id],
    queryFn: () => getGroupUserAuthenticatedAuthority(group_id, user.id),
    staleTime: Infinity,
  });

  // 🚫 5. Se o usuário não for o dono, lança erro customizado
  if (authority !== 'OWNER') {
    const basePath = `/groups/${group_id}`;
    const btn = { label: 'Voltar para o grupo', path: basePath };

    // Lança erro customizado que será capturado pelo React Router
    throw new ForbiddenError(
      'Somente o dono do grupo pode acessar as configurações.',
      403,
      btn
    );
  }

  // ✅ 6. Permite prosseguir se for OWNER
  return null;
}
