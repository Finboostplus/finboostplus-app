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
        <h2 className="text-xl font-semibold text-text">
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
      <GraphicArea activeChart={activeChart} />
    </div>
  );
}

function GraphicArea({ activeChart }) {
  return (
    <>
      {/* Área do gráfico */}
      <div
        className="
    relative w-full h-72 sm:h-80 
    bg-surface 
    rounded-xl 
    flex items-center justify-center 
    transition-all duration-500 
    
  "
      >
        {/* ✨ Transição suave entre os gráficos */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeChart === 'balance' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <BalanceChart />
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeChart === 'expense' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <ExpenseChart />
        </div>

        {/* Fallback caso não haja dados */}
        {!activeChart && (
          <p className="text-muted italic">Nenhum gráfico selecionado.</p>
        )}
      </div>
    </>
  );
}
