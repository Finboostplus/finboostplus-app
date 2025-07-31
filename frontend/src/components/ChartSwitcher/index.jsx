import { useState } from 'react';
import { FaChartLine, FaWallet } from 'react-icons/fa';
import BalanceChart from './BalanceChart';
import ExpenseChart from './ExpenseChart';

export default function ChartSwitcher() {
  const [activeChart, setActiveChart] = useState('balance');

  const toggleChart = () => {
    setActiveChart(prev => (prev === 'balance' ? 'expense' : 'balance'));
  };

  return (
    <div className="w-full bg-[var(--color-surface)] p-4 rounded-2xl shadow-md space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          Visualização Financeira
        </h2>
        <button
          onClick={toggleChart}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          {activeChart === 'balance' ? (
            <FaWallet size={18} />
          ) : (
            <FaChartLine size={18} />
          )}
          <span className="text-sm">
            {activeChart === 'balance' ? 'Gastos Mensais' : 'Saldo Geral'}
          </span>
        </button>
      </div>

      <div className="h-[300px]">
        {activeChart === 'balance' ? <BalanceChart /> : <ExpenseChart />}
      </div>
    </div>
  );
}
