import { Menu, MenuItem } from '@headlessui/react';
import userData from '../../mockData/user/user.data';
import { formatBRL } from '../../utils/formatters';
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
        <span className="text-muted">({myExpenses.length})</span>
      </h2>

      <Menu as="ul" className="space-y-4">
        {myExpenses.map((expense, i) => (
          <li key={i}>
            <MenuItem
              as="a"
              href={`/groups/${expense?.groupId}`}
              key={expense?.id}
              className="flex justify-between items-start bg-neutral rounded-lg p-4 border border-surface hover:shadow-sm transition-shadow cursor-pointer"
              aria-label={`Despesa: ${expense?.group}`}
            >
              <div>
                <p
                  className="font-semibold text-text"
                  aria-label="Título da despesa"
                >
                  {expense?.title}
                </p>
                <p
                  className="text-sm text-muted"
                  aria-label="Data e grupo da despesa"
                >
                  data da criação {'->'} {expense?.createdAt} |{' '}
                  {expense?.deadlineDate} {'<-'} Data do Vencimento
                </p>
              </div>

              <p
                className="font-bold text-error"
                aria-label={`Valor da despesa: ${expense?.partialValue}`}
              >
                {formatBRL(expense?.partialValue)}
              </p>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </section>
  );
}
