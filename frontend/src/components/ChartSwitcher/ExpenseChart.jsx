import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { avatarBackgroundColors } from '../../mockData/colorsPallete/colors';
import { useMeDashboardQuery } from '../../hooks/ReactQuery/Queries/useMeDashboardStatsQuery';

export default function ExpenseQuantityDonutChart() {
  const { data: expenseData } = useMeDashboardQuery();
  const total = expenseData?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="relative w-full h-[280px] sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="quantity"
            nameKey="category"
            innerRadius="60%"
            outerRadius="80%"
            stroke="var(--color-surface)"
            strokeWidth={2}
            paddingAngle={1}
            labelLine={false}
            label={({ name }) =>
              `${name}: ${
                expenseData.find(c => c.category === name)?.quantity ?? 0
              }`
            }
          >
            {expenseData?.map((_, index) => (
              <Cell
                key={index}
                fill={
                  avatarBackgroundColors[index % avatarBackgroundColors.length]
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 💬 Centro do gráfico */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-sm text-muted">Total de despesas</p>
        <p className="text-3xl font-bold text-text mt-1">{total}</p>
      </div>
    </div>
  );
}
