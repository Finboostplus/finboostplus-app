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
    <div className="w-full h-[300px] bg-surface p-4 rounded-2xl  mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={balanceData}>
          <CartesianGrid stroke="var(--color-muted)" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="var(--color-text)" />
          <YAxis stroke="var(--color-text)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-muted)',
              color: 'var(--color-text)',
            }}
            labelStyle={{ color: 'var(--color-text)' }}
            itemStyle={{ color: 'var(--color-text)' }}
          />
          <Legend wrapperStyle={{ color: 'var(--color-text)' }} />
          <Area
            type="monotone"
            dataKey="receitas"
            stroke="var(--color-success)"
            fill="var(--color-success)"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="despesas"
            stroke="var(--color-error)"
            fill="var(--color-error)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
