export function getMonthlyExpensesSummary(expenses) {
  // Soma total de todos os meses
  const totalExpenses = expenses.reduce((sum, { total }) => sum + total, 0);

  // Obter o mês com maior gasto
  const maxExpenseMonth = expenses.reduce(
    (max, item) => (item.total > max.total ? item : max),
    { month: '', total: 0 }
  );

  return {
    totalExpenses,
    maxExpenseMonth,
  };
}
