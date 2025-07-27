import { formatBRL } from '../../../utils/formatters';

export default function ExpensesList({ group }) {
  return (
    <section
      className="bg-white p-6 rounded-lg shadow-md"
      aria-labelledby="recent-expenses-heading"
    >
      <h2
        id="recent-expenses-heading"
        className="text-xl font-semibold text-text border-b border-muted pb-4 mb-4 font-principal"
      >
        Últimas despesas
      </h2>
      <ul className="space-y-4 font-principal">
        {group.recentExpenses.map(expense => (
          <li
            key={expense.id}
            className="flex justify-between items-center py-2 border-b border-muted last:border-b-0"
          >
            <span className="text-text text-base sm:text-lg">
              {expense.description}
            </span>
            <span className="text-text font-semibold text-base sm:text-lg">
              - {formatBRL(expense.amount)}
            </span>
          </li>
        ))}
        {group.recentExpenses.length === 0 && (
          <p className="text-muted text-sm italic">Nenhuma despesa recente.</p>
        )}
      </ul>
    </section>
  );
}
