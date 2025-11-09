import { REACTQUERY_KEYS } from '../libs/ReactQuery/keys';
import { queryClient } from '../libs/ReactQuery/queryClient';
import {
  getGroupExpenseById,
  getGroupUserAuthenticatedAuthority,
} from '../services/groups';
import { getMe } from '../services/me';

export async function expenseLoader({ request, params }) {
  const { group_id, expense_id } = params;

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

  // Declara expense fora do try
  let expense;
  const url = new URL(request.url);
  const path = url.pathname.split(`/expenses`)[0];
  try {
    expense = await queryClient.ensureQueryData({
      queryKey: [
        REACTQUERY_KEYS.GROUPS.EXPENSES,
        'groups',
        Number(group_id),
        Number(expense_id),
      ],
      queryFn: () => getGroupExpenseById(group_id, expense_id),
    });
  } catch (error) {
    const responseData = {
      btnText: 'Voltar para a página anterior?',
      message: 'Despesa não encontrada!',
      path,
    };
    throw new Response(JSON.stringify(responseData), {
      status: 403,
      statusText: 'Erro!',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
      },
    });
  }

  // Verifica se o usuário é membro da despesa
  const isMember = expense.memberList.some(member => member.userId === user.id);
  if (!isMember) {
    const responseData = {
      btnText: 'Voltar para a página anterior?',
      message: 'Despesa não encontrada!',
      path,
    };
    throw new Response(JSON.stringify(responseData), {
      status: 403,
      statusText: 'Erro!',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
      },
    });
  }

  return authority;
}
