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
    <ResponsiveContainer
      lassName="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl"
      width="100%"
      height="100%"
    >
      <AreaChart
        data={expensesByMonthly}
        margin={{ top: 15, right: 35, left: 0, bottom: 5 }}
      >
        {/* Linhas de grade */}
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />

        {/* Eixo X (meses) */}
        <XAxis
          dataKey="name"
          stroke="var(--color-text)"
          tick={{ fontSize: 12, fill: 'var(--color-text)' }}
          axisLine={false}
          tickLine={false}
        />

        {/* Eixo Y (valores) */}
        <YAxis
          stroke="var(--color-text)"
          tickFormatter={value => formatBRL(value)}
          tick={{ fontSize: 12, fill: 'var(--color-text)' }}
          axisLine={false}
          tickLine={false}
          width={80}
        />

        {/* Tooltip estilizado */}
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-surface border border-border/40 shadow-md rounded-lg px-3 py-2 text-sm text-text">
                  <p className="font-semibold">{label}</p>
                  <p className="text-muted-foreground">
                    Despesas:{' '}
                    <span className="font-medium">
                      {formatBRL(payload[0].value)}
                    </span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        {/* Gradiente suave (mantém o tema dinâmico) */}
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
          dot={{ r: 3, strokeWidth: 1, fill: 'var(--color-error)' }}
          activeDot={{ r: 5 }}
          animationDuration={700}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
