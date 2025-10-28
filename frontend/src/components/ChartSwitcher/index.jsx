import { useState } from 'react';
import { FaChartLine, FaWallet } from 'react-icons/fa';
import BalanceChart from './BalanceChart';
import ExpenseChart from './ExpenseChart';

export default function ChartSwitcher() {
  const [activeChart, setActiveChart] = useState('balance');

  const toggleChart = () => {
    setActiveChart(prev => (prev === 'balance' ? 'expense' : 'balance'));
  };

  const buttonLabel =
    activeChart === 'balance' ? 'Gastos Mensais' : 'Saldo Geral';
  const ButtonIcon = activeChart === 'balance' ? FaWallet : FaChartLine;

  return (
    <div className="w-full bg-surface p-4 rounded-2xl shadow-md space-y-4 mb-6 transition-colors">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          {activeChart === 'balance'
            ? 'Visualização Financeira'
            : 'Distribuição das Despesas por Categoria'}
        </h2>

        {/* Botão para alternar gráfico */}
        <button
          onClick={toggleChart}
          aria-label={`Alternar para ${buttonLabel}`}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-primary hover:opacity-90 transition cursor-pointer"
        >
          <ButtonIcon size={18} />
          <span className="text-sm">{buttonLabel}</span>
        </button>
      </div>

      {/* Área do gráfico */}
      <div className="flex items-center justify-center w-full h-72">
        {activeChart === 'balance' ? <BalanceChart /> : <ExpenseChart />}
      </div>
    </div>
  );
}
