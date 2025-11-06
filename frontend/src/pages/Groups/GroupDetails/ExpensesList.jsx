import { useState, useMemo } from 'react';
import { TbPigMoney } from 'react-icons/tb';
import { formatBRL } from '../../../utils/formatters';
import { Link } from 'react-router';

import SelectUI from '../../../components/ui/Select';
import CheckboxUI from '../../../components/ui/Checkbox';
import ButtonUI from '../../../components/ui/Button';
import Pagination from '../../../components/PaginationController';
import Modal from '../../../components/Modal';

import { usePermissions } from './usePermissions';
import { useGroupExpensesQuery } from '../../../hooks/ReactQuery/Queries/useGroupExpensesQuery';
import { EXPENSE_STATUS } from './statusExpense';

export default function ExpensesList({ groupID, authorization }) {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('PENDING');
  const [allMembers, setAllMembers] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
      <header className="flex items-center justify-between mb-6">
        <h2
          id="expenses-heading"
          className="flex items-center gap-2 text-2xl font-semibold text-text font-principal"
        >
          <TbPigMoney className="w-7 h-7 text-primary" />
          Despesas do Grupo
        </h2>
      </header>

      {/* 🔍 Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <SelectUI
            id="status-select"
            value={status}
            disabled={allMembers}
            onChange={handleStatusChange}
            className="flex-1 h-10 min-w-[160px] rounded-lg border border-border/40 bg-surface-light text-sm text-text focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer shadow-sm"
          >
            {!allMembers ? (
              <>
                <option value="PENDING">Pendentes</option>
                <option value="UNPAID">Não Pagas</option>
                <option value="PAID">Pagas</option>
              </>
            ) : (
              <option value="">Todas as despesas</option>
            )}
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
            const COLOR_STATUS =
              expense.status === 'PAID'
                ? 'bg-success text-green-900'
                : expense.status === 'PENDING'
                  ? 'bg-warning text-yellow-900'
                  : expense.status === 'UNPAID'
                    ? 'bg-error text-red-900'
                    : 'text-text';
            return (
              <li key={expense.expenseId}>
                <ButtonUI
                  onClick={() => setIsOpenModal(true)}
                  className="relative flex w-full justify-between items-center px-4 py-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors border border-border/10 cursor-pointer"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-text font-medium capitalize">
                      {expense.title}
                      {expense.status !== null && (
                        <span
                          className={`absolute font-bold top-0 left-0 py-0.2 px-2 rounded-br-md ${COLOR_STATUS}`}
                        >
                          {EXPENSE_STATUS[expense.status]}
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`block font-semibold text-base sm:text-lg ${COLOR_STATUS}`}
                    >
                      {formatBRL(expense.partialValue || expense.total)}
                    </span>
                    <span className="text-xs text-muted">
                      Prazo final:{' '}
                      {expense.deadlineDate
                        ? new Date(expense.deadlineDate).toLocaleDateString(
                            'pt-BR'
                          )
                        : 'Sem prazo'}
                    </span>
                  </div>
                </ButtonUI>
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

      {/* 🪟 Modal */}
      <Modal
        isOpen={isOpenModal}
        fnClose={() => setIsOpenModal(false)}
        setIsOpen={setIsOpenModal}
      >
        <div className="text-center py-4 text-sm text-text">
          Detalhes da despesa selecionada.
        </div>
      </Modal>
    </section>
  );
}
