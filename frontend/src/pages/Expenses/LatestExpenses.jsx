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
    <section aria-labelledby="ultimas-despesas-heading">
      <h2 id="ultimas-despesas-heading" className="text-lg font-bold mb-4">
        Últimas Despesas
      </h2>

      <ul className="space-y-2">
        {expenses.map((expense, i) => (
          <li
            key={i}
            className="flex justify-between items-start border-b pb-2"
            aria-label={`Despesa: ${expense.title}`}
          >
            <div>
              <p className="font-semibold" aria-label="Título da despesa">
                {expense.title}
              </p>
              <p
                className="text-gray-500 text-sm"
                aria-label="Data e grupo da despesa"
              >
                | {expense.group}
              </p>
            </div>

            <p
              className="font-bold"
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
