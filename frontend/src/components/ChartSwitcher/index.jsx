import { useState } from 'react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import BalanceChart from './BalanceChart';
import ExpenseChart from './ExpenseChart';
import ButtonUI from '../ui/Button';
import { useMeDashboardQuery } from '../../hooks/ReactQuery/Queries/useMeDashboardStatsQuery';

export default function ChartSwitcher() {
  const [activeChart, setActiveChart] = useState('balance');
  const { data: expenseData } = useMeDashboardQuery();
  const total = expenseData?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="w-full bg-surface p-6 rounded-2xl shadow-md border border-border/40 transition-colors duration-300 space-y-6">
      {/* Cabeçalho */}
      <div className="flex  flex-1  justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-text transition-all duration-300">
          {activeChart === 'balance'
            ? `Como Você Gastou em (${new Date().getFullYear()})`
            : `Despesas por Categoria (${total})`}
        </h2>

        {/* Alternador */}
        <div className="relative flex bg-muted/20 rounded-full p-1.5 text-sm font-medium w-fit select-none">
          {/* Indicador animado */}
          <div
            className={`absolute top-1 bottom-1 w-[50%] bg-primary rounded-full transition-all duration-300 ${
              activeChart === 'expense' ? 'left-1/2' : 'left-1'
            }`}
          ></div>
          {/* Opção: Gastos Mensais */}
          <ButtonUI
            onClick={() => setActiveChart('balance')}
            className={`relative z-10 w-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors duration-300 ${
              activeChart === 'balance'
                ? 'text-white'
                : 'text-muted-foreground hover:text-text'
            }`}
          >
            <FaChartLine size={16} />
            <span>Resumo Anual</span>
          </ButtonUI>
          {/* Opção: Saldo Geral */}
          <ButtonUI
            onClick={() => setActiveChart('expense')}
            className={`relative z-10 w-1/2 flex items-center gap-2 px-4 py-0.5 rounded-full cursor-pointer transition-colors duration-300 ${
              activeChart === 'expense'
                ? 'text-white'
                : 'text-muted-foreground hover:text-text'
            }`}
          >
            <FaChartPie size={16} />
            <span>Divisão de Gastos</span>
          </ButtonUI>
        </div>
      </div>

      {/* Área dos gráficos */}
      <div className="relative w-full min-h-72 sm:h-80  rounded-xl ">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            activeChart === 'balance' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <BalanceChart />
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            activeChart === 'expense' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
}
