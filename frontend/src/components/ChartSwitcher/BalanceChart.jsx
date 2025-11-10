import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMeExpensesByMonthly } from '../../services/me';
import { formatBRL } from '../../utils/formatters';

export default function BalanceChart() {
  const { data: expensesResponse } = useQuery({
    queryKey: [REACTQUERY_KEYS.USER.DASHBOARD, 'balance'],
    queryFn: getMeExpensesByMonthly,
  });

  const expensesByMonthly =
    expensesResponse?.map(item => ({
      name: item.month,
      despesas: item.total,
    })) ?? [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={expensesByMonthly}
        margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
      >
        {/* Grade */}
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
          stroke="var(--color-text)"
          tick={{ fontSize: 12, fill: 'var(--color-text)' }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          stroke="var(--color-text)"
          tickFormatter={value => formatBRL(value)}
          tick={{ fontSize: 12, fill: 'var(--color-text)' }}
          axisLine={false}
          tickLine={false}
        />

        {/* Tooltip com tema dinâmico */}
        <Tooltip
          formatter={value => formatBRL(value)}
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
          labelStyle={{
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}
          itemStyle={{ color: 'var(--color-text)' }}
        />

        {/* Gradiente suave (segue o tema pelas CSS vars) */}
        <defs>
          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-error)"
              stopOpacity={0.4}
            />
            <stop offset="95%" stopColor="var(--color-error)" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Área principal */}
        <Area
          type="monotone"
          dataKey="despesas"
          name="Despesas"
          stroke="var(--color-error)"
          fill="url(#colorExpense)"
          strokeWidth={2}
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
