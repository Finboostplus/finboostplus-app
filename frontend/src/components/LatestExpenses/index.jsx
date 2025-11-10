import { useState } from 'react';
import { Menu, MenuItem } from '@headlessui/react';
import {
  formatBRL,
  formatDateBR,
  formatRelativeDate,
} from '../../utils/formatters';

import Pagination from '../PaginationController';
import useMeExpensesQuery from '../../hooks/ReactQuery/Queries/useMeExpensesQuery';

export default function LatestExpenses() {
  // 🔢 Estado da paginação
  const [page, setPage] = useState(0);

  // 🔗 Consulta das despesas
  const { data, isLoading } = useMeExpensesQuery(page);
  // 💾 Dados vindos do backend
  const expenses = data?.expenses;
  const totalPages = data?.totalPages;
  const totalExpenses = data?.expensesLength;
  // 🕹️ Handlers de navegação
  const handleNext = () => {
    if (page < totalPages - 1) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  return (
    <section
      aria-labelledby="ultimas-despesas-heading"
      className="bg-surface border border-border rounded-2xl p-6 shadow-md  transition-colors"
    >
      <h2
        id="ultimas-despesas-heading"
        className="text-lg font-bold text-text mb-4"
      >
        Últimas Despesas <span className="text-muted">({totalExpenses})</span>
      </h2>

      {isLoading ? (
        <p className="text-muted text-sm">Carregando despesas...</p>
      ) : expenses?.length === 0 ? (
        <p className="text-muted text-sm italic">Nenhuma despesa encontrada.</p>
      ) : (
        <>
          <Menu as="ul" className="space-y-4">
            {expenses?.map(expense => (
              <li key={expense.expenseId}>
                <MenuItem
                  as="a"
                  href={`/groups/${expense.groupId}/expenses/${expense.expenseId}`}
                  aria-label={`Despesa: ${expense.title}`}
                >
                  <div className="text-text bg-neutral border-surface rounded-lg p-4 border hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p
                        className="font-semibold"
                        aria-label="Título da despesa"
                      >
                        {expense.title}
                      </p>
                      <p
                        className="font-bold text-error"
                        aria-label={`Valor da despesa: ${formatBRL(expense.partialValue)}`}
                      >
                        {formatBRL(expense.partialValue)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-1 text-xs text-muted">
                      <span className="font-medium text-primary/80">
                        {expense.groupName && `#${expense.groupName}`}
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="italic">
                          criada {formatRelativeDate(expense.createdAt)}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-semibold text-accent">
                          vence {formatDateBR(expense.deadlineDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </MenuItem>
              </li>
            ))}
          </Menu>

          {totalPages > 1 && (
            <>
              {/* 🔄 Controle de Paginação */}
              <Pagination
                onNext={handleNext}
                onPrev={handlePrev}
                page={page}
                totalPages={totalPages}
              />
            </>
          )}
        </>
      )}
    </section>
  );
}
