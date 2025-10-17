import { useState } from 'react';
import { FaChartLine, FaWallet } from 'react-icons/fa';
import BalanceChart from './BalanceChart';
import ExpenseChart from './ExpenseChart';

export default function ChartSwitcher({
  isEmpty = false,
  emptyMessage = 'Sem dados para exibir',
}) {
  const [activeChart, setActiveChart] = useState('balance');

  const toggleChart = () => {
    setActiveChart(prev => (prev === 'balance' ? 'expense' : 'balance'));
  };

  const buttonLabel =
    activeChart === 'balance' ? 'Gastos Mensais' : 'Saldo Geral';
  const ButtonIcon = activeChart === 'balance' ? FaWallet : FaChartLine;

  return (
    <div className="w-full bg-[var(--color-surface)] p-4 rounded-2xl shadow-md space-y-4 mb-6 transition-colors">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          Visualização Financeira
        </h2>

        {/* Botão para alternar gráfico */}
        <button
          onClick={toggleChart}
          disabled={isEmpty}
          aria-label={`Alternar para ${buttonLabel}`}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-white transition cursor-pointer
            ${isEmpty ? 'bg-neutral cursor-not-allowed' : 'bg-[var(--color-primary)] hover:opacity-90'}`}
        >
          <ButtonIcon size={18} />
          <span className="text-sm">{buttonLabel}</span>
        </button>
      </div>

      {/* Área do gráfico */}
      <div className=" flex items-center justify-center">
        {isEmpty ? (
          <div
            className="text-[var(--color-muted)] text-center"
            data-testid="empty-state"
          >
            {emptyMessage}
          </div>
        ) : activeChart === 'balance' ? (
          <BalanceChart />
        ) : (
          <ExpenseChart />
        )}
      </div>
    </div>
  );
}
