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
  '#ff69b4', // Rosa vibrante
  '#ffb6c1', // Rosa claro
  '#ffd700', // Dourado
  '#ba55d3', // Roxo médio
  '#87cefa', // Azul claro
  '#ffa07a', // Coral suave
];

export default function ExpensePieChart() {
  const expenseData = userData.dashboard.chartsData.expenseData;

  return (
    <div className="w-full bg-surface rounded-2xl shadow-md transition-colors">
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Pie principal */}
            <Pie
              data={expenseData}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label={{ fill: 'var(--color-text)', fontWeight: 500 }}
            >
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* Tooltip */}
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
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                color: 'var(--color-text)',
                fontWeight: 500,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
