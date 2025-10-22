import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import userData from '../../mockData/user/user.data';

export default function BalanceChart() {
  const balanceData = userData.dashboard.chartsData.balanceData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={balanceData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* Grid */}
        <CartesianGrid stroke="var(--color-muted)" strokeDasharray="3 3" />

        {/* Eixos */}
        <XAxis dataKey="name" stroke="var(--color-text)" />
        <YAxis stroke="var(--color-text)" />

        {/* Tooltip customizado */}
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-muted)',
            color: 'var(--color-text)',
          }}
          labelStyle={{ color: 'var(--color-text)', fontWeight: 500 }}
          itemStyle={{ color: 'var(--color-text)' }}
        />

        {/* Legenda */}
        <Legend
          wrapperStyle={{
            color: 'var(--color-text)',
            fontWeight: 500,
          }}
        />

        {/* Áreas do gráfico */}
        <Area
          type="monotone"
          dataKey="receitas"
          name="Receitas"
          stroke="var(--color-success)"
          fill="var(--color-success)"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="despesas"
          name="Despesas"
          stroke="var(--color-error)"
          fill="var(--color-error)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
