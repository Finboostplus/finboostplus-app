import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import userData from '../../mockData/user/user.data';

const COLORS = [
  '#ff69b4', // Rosa vibrante (cor principal da Luna)
  '#ffb6c1', // Rosa claro
  '#ffd700', // Dourado brilhante (energia e destaque)
  '#ba55d3', // Roxo médio (estilo e personalidade)
  '#87cefa', // Azul claro (leveza e diversão)
  '#ffa07a', // Coral suave (acolhedor e amigável)
];

export default function ExpensePieChart() {
  const expenseData = userData.dashboard.chartsData.expenseData;

  return (
    <div className="w-full h-[300px] bg-surface p-4 rounded-2xl  mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="valor"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
