import { useState, useMemo } from 'react';
import { TbPigMoney } from 'react-icons/tb';
import { formatBRL } from '../../../utils/formatters';
import { Link } from 'react-router';

import SelectUI from '../../../components/ui/Select';
import CheckboxUI from '../../../components/ui/Checkbox';

import Pagination from '../../../components/PaginationController';

import { usePermissions } from './usePermissions';
import { useGroupExpensesQuery } from '../../../hooks/ReactQuery/Queries/useGroupExpensesQuery';
import { EXPENSE_STATUS, STATUS_COLORS } from './statusExpense';

export default function ExpensesList({ groupID, authorization }) {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('PENDING');
  const [allMembers, setAllMembers] = useState(false);

  const { canViewAllExpenses } = usePermissions(authorization);

  // 🧩 Filtros estabilizados para o React Query
  const queryFilters = useMemo(() => {
    const filters = { status };
    if (canViewAllExpenses && allMembers)
      filters.allGroupMembersExpenses = true;
    return filters;
  }, [status, allMembers, canViewAllExpenses]);

  // 🔄 Query de despesas
  const { data, isLoading } = useGroupExpensesQuery(
    groupID,
    page,
    queryFilters
  );

  const expenses = data?.expenses ?? [];
  const totalPages = data?.totalPages ?? 0;
  const expensesLength = data?.expensesLength ?? 0;

  // 🪄 Handlers
  const handleStatusChange = e => {
    setStatus(e.target.value);
    setPage(0);
  };

  const handleAllMembersChange = checked => {
    setAllMembers(checked);
    setPage(0);
  };

  // 🧾 UI
  return (
    <section
      className="bg-surface p-6 rounded-lg shadow-md transition-all duration-300"
      aria-labelledby="expenses-heading"
    >
      {/* 🧭 Cabeçalho */}
      <header className="flex items-center justify-between mb-8 pb-3 ">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <TbPigMoney className="w-7 h-7" />
          </div>

          <div className="flex flex-col">
            <h2
              id="expenses-heading"
              className="text-2xl font-semibold text-text font-principal flex items-center gap-2"
            >
              Despesas do Grupo
            </h2>
            <p className="text-sm text-muted mt-0.5">
              {allMembers ? 'De todos os membros' : 'Suas despesas'}
            </p>
          </div>
        </div>

        {/* Espaço opcional para botões, filtros, etc. */}
        {/* <ButtonUI size="sm" variant="outline">Nova despesa</ButtonUI> */}
      </header>

      {/* 🔍 Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <SelectUI
            id="status-select"
            value={status}
            onChange={handleStatusChange}
            className={`flex-1 h-10 min-w-[160px] rounded-lg border border-border/40 bg-surface-light text-sm text-text focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer shadow-sm`}
          >
            <option value="PENDING">Pendentes</option>
            <option value="UNPAID">Não Pagas</option>
            <option value="PAID">Pagas</option>
          </SelectUI>
        </div>

        {canViewAllExpenses && (
          <div className="flex items-center sm:ml-4">
            <CheckboxUI
              label="Incluir despesas de todos os membros"
              checked={allMembers}
              onChange={handleAllMembersChange}
            />
          </div>
        )}
      </div>

      {/* 📜 Lista */}
      {isLoading ? (
        <p className="text-muted text-sm italic text-center">
          Carregando despesas...
        </p>
      ) : expensesLength > 0 ? (
        <ul className="space-y-3 font-principal">
          {expenses.map(expense => {
            const color =
              STATUS_COLORS[expense.status] || STATUS_COLORS.DEFAULT;

            return (
              <li key={expense.expenseId}>
                <Link
                  to={`expenses/${expense.expenseId}`}
                  className="relative overflow-hidden flex w-full justify-between items-center px-4 py-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors border border-border/10 cursor-pointer"
                >
                  {/* 🏷️ Título e status */}
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-text font-medium capitalize">
                      {expense.title}
                      {expense.status && (
                        <span
                          className={`absolute font-bold top-0 left-0 py-0.5 px-2 rounded-br-md text-white! ${color.bg}`}
                        >
                          {EXPENSE_STATUS[expense.status]}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* 💰 Valor e informações */}
                  <div className="text-right space-y-1">
                    <div className="flex gap-2">
                      {/* Identificador da despesa */}
                      {expense.total ? (
                        <span
                          className={`inline-flex items-center px-2 text-xs font-medium rounded-full ${color.bg} text-white`}
                        >
                          Valor total da despesa
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2 text-xs font-medium rounded-full ${color.bg} text-white`}
                        >
                          Sua parte da despesa
                        </span>
                      )}
                    </div>
                    {/* Valor principal */}
                    <span
                      className={`block font-semibold text-base sm:text-lg ${color.text}`}
                    >
                      {formatBRL(expense.partialValue ?? expense.total)}
                    </span>

                    {/* Prazo */}
                    <span className="text-xs text-muted dark:text-muted-dark">
                      Prazo final:{' '}
                      {expense.deadlineDate
                        ? new Date(expense.deadlineDate).toLocaleDateString(
                            'pt-BR'
                          )
                        : 'Sem prazo'}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-muted text-sm italic text-center mt-4">
          Nenhuma despesa encontrada para os filtros selecionados.
        </p>
      )}

      {/* 📄 Paginação */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            onNext={() => setPage(p => (p + 1 < totalPages ? p + 1 : p))}
            onPrev={() => setPage(p => Math.max(p - 1, 0))}
          />
        </div>
      )}
    </section>
  );
}
