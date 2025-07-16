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
    <section>
      <h2 className="text-lg font-bold mb-4">Últimas Despesas</h2>
      <ul className="space-y-2">
        {expenses.map((expense, i) => (
          <li
            key={i}
            className="flex justify-between items-start border-b pb-2"
          >
            <div>
              <p className="font-semibold">{expense.title}</p>
              <small className="text-gray-500">
                {expense.date} | {expense.group}
              </small>
            </div>
            <p className="font-bold">{expense.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
