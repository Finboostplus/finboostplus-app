import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { avatarBackgroundColors } from '../../mockData/colorsPallete/colors';
import { useMeDashboardQuery } from '../../hooks/ReactQuery/Queries/useMeDashboardStatsQuery';
import { formatBRL } from '../../utils/formatters';

export default function ExpenseQuantityDonutChart() {
  const { data: expenseData } = useMeDashboardQuery();
  const total = expenseData?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full h-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const { name, value } = payload[0];
                  const percent = ((value / total) * 100).toFixed(1);
                  return (
                    <div className="bg-surface border border-border/40 shadow-md rounded-lg px-3 py-2 text-sm text-text">
                      <p className="font-semibold">{name}</p>
                      <p className="text-muted-foreground">
                        Quantidade:{' '}
                        <span className="font-medium">
                          {formatBRL(value, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            style: 'decimal',
                          })}
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        {percent}% do total
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Pie
              data={expenseData}
              dataKey="quantity"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              stroke="var(--color-surface)"
              strokeWidth={3}
              paddingAngle={2}
              labelLine={false} // labels removidos
            >
              {expenseData?.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    avatarBackgroundColors[
                      index % avatarBackgroundColors.length
                    ]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Total centralizado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-bold text-text leading-none">
            {formatBRL(total, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              style: 'decimal',
            })}
          </span>
          <span className="text-sm text-muted-foreground leading-none">
            Total
          </span>
        </div>
      </div>
    </div>
  );
}
