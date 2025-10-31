import { Menu, MenuItem } from '@headlessui/react';
import userData from '../../mockData/user/user.data';
import {
  formatBRL,
  formatDateBR,
  formatRelativeDate,
} from '../../utils/formatters';
import useMeQuery from '../../hooks/ReactQuery/useMeQuery';

export default function LatestExpenses() {
  const current_user = userData;
  const { data: me } = useMeQuery();
  const myExpenses = me?.totalExpenses;
  console.log(myExpenses);
  return (
    <section
      aria-labelledby="ultimas-despesas-heading"
      className="bg-surface rounded-2xl p-6 shadow-md border border-neutral transition-colors"
    >
      <h2
        id="ultimas-despesas-heading"
        className="text-lg font-bold text-text mb-4"
      >
        Últimas Despesas{' '}
        <span className="text-muted">({myExpenses?.length})</span>
      </h2>

      <Menu as="ul" className="space-y-4">
        {myExpenses?.map(expense => (
          <li key={expense?.id}>
            <MenuItem
              as="a"
              href={`/groups/${expense?.groupId}`}
              aria-label={`Despesa: ${expense?.title}`}
            >
              <div className="text-text bg-neutral border-surface  rounded-lg p-4 border hover:shadow-sm transition-shadow cursor-pointer ">
                <div className="flex justify-between items-start">
                  <p className="font-semibold" aria-label="Título da despesa">
                    {expense?.title}
                  </p>
                  <p
                    className="font-bold text-error"
                    aria-label={`Valor da despesa: ${formatBRL(expense?.partialValue)}`}
                  >
                    {formatBRL(expense?.partialValue)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-1 text-xs text-muted">
                  <span className="font-medium text-primary/80">
                    {expense?.groupName && `#${expense.groupName}`}
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="italic">
                      criada {formatRelativeDate(expense?.createdAt)}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-semibold text-accent">
                      vence {formatDateBR(expense?.deadlineDate)}
                    </span>
                  </div>
                </div>
              </div>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </section>
  );
}
