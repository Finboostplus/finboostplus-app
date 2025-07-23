export default function ExpensesList({ group }) {
  return (
    <>
      {/* Recent Expenses Section */}
      <section
        className="bg-white p-6 rounded-lg shadow-md"
        aria-labelledby="recent-expenses-heading"
      >
        <h2
          id="recent-expenses-heading"
          className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4"
        >
          Últimas despesas
        </h2>
        <ul className="space-y-4">
          {group.recentExpenses.map(expense => (
            <li
              key={expense.id}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-gray-700 text-lg">
                {expense.description}
              </span>
              <span className="text-gray-800 font-medium text-lg">
                {expense.amount}
              </span>
            </li>
          ))}
          {group.recentExpenses.length === 0 && (
            <p className="text-gray-500">Nenhuma despesa recente.</p>
          )}
        </ul>
      </section>
    </>
  );
}
