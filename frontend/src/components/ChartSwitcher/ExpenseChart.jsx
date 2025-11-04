import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { avatarBackgroundColors } from '../../mockData/colorsPallete/colors';
import { useMeDashboardQuery } from '../../hooks/ReactQuery/useMeDashboardStatsQuery';

export default function ExpenseQuantityDonutChart() {
  const { data: expenseData } = useMeDashboardQuery();
  const total = expenseData?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="quantity"
            nameKey="category"
            innerRadius="60%"
            outerRadius="80%"
            label={({ name, percent }) =>
              `${name}: ${expenseData.find(c => c.category === name)?.quantity}`
            }
            labelLine={true}
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
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-muted)',
              color: 'var(--color-text)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-text)', fontWeight: 600 }}
            formatter={value => [`${value}`, 'Quantidade de despesas']}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted">Total</p>
          <p className="text-lg font-semibold text-text">{total}</p>
        </div>
      </div>
    </div>
  );
}
