const expenses = [
  {
    title: 'Jantar - Restaurante',
    date: 'Hoje',
    group: 'Casal',
    value: 'R$ 95,00',
  },
  { title: 'Mercado', date: 'Ontem', group: 'Família', value: 'R$ 157,80' },
];

export default function LatestExpenses() {
  return (
    <section
      aria-labelledby="ultimas-despesas-heading"
      className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
    >
      <h2
        id="ultimas-despesas-heading"
        className="text-lg font-bold text-text mb-4"
      >
        Últimas Despesas <span className="text-muted">({expenses.length})</span>
      </h2>

      <ul className="space-y-4">
        {expenses.map((expense, i) => (
          <li
            key={i}
            className="flex justify-between items-start bg-neutral rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow"
            aria-label={`Despesa: ${expense.title}`}
          >
            <div>
              <p
                className="font-semibold text-text"
                aria-label="Título da despesa"
              >
                {expense.title}
              </p>
              <p
                className="text-sm text-muted"
                aria-label="Data e grupo da despesa"
              >
                {expense.date} | {expense.group}
              </p>
            </div>

            <p
              className="font-bold text-error"
              aria-label={`Valor da despesa: ${expense.value}`}
            >
              {expense.value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
