import { MdCreditCardOff, MdBarChart } from 'react-icons/md';
import CardUI from '../ui/Card';
import { formatBRL } from '../../utils/formatters';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMeExpensesByMonthly } from '../../services/me';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyExpensesSummary } from './expenseUtils';

export default function SummaryCards() {
  const { data: expensesResponse } = useQuery({
    queryKey: [REACTQUERY_KEYS.USER.DASHBOARD, 'balance'],
    queryFn: getMeExpensesByMonthly,
  });

  const summary = expensesResponse?.length
    ? getMonthlyExpensesSummary(expensesResponse)
    : { totalExpenses: 0, mostExpense: { month: '', total: 0 } };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* Total de Gastos no Ano */}
      <CardUI className="relative overflow-hidden p-6 rounded-2xl shadow-md border border-border bg-surface text-text transition-colors">
        <MdCreditCardOff className="absolute right-4 top-4 w-20 h-20 opacity-10 text-muted-foreground" />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total de Gastos no Ano
          </p>
          <p className="text-2xl font-extrabold">
            {formatBRL(summary.totalExpenses)}
          </p>
        </div>
      </CardUI>

      {/* Mês com Maior Gasto */}
      <CardUI className="relative overflow-hidden p-6 rounded-2xl shadow-md border border-border bg-surface text-text transition-colors">
        <MdBarChart className="absolute right-4 top-4 w-20 h-20 opacity-10 text-muted-foreground" />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Mês com Maior Gasto
          </p>
          <p className="text-2xl font-extrabold">
            {summary.maxExpenseMonth?.month || '-'} (
            {formatBRL(summary.maxExpenseMonth?.total)})
          </p>
        </div>
      </CardUI>
    </div>
  );
}
