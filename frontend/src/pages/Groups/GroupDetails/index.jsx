import { useLoaderData } from 'react-router';
import ButtonUI from '../../../components/ui/Button'; // Assumindo que este é um componente de botão genérico
import BalancesList from './BalancesList';
import ExpensesList from './ExpensesList';
import { useState } from 'react';

export default function GroupDetails() {
  const [showBalanceOrExpensesList, setShowBalanceOrExpensesList] =
    useState(true); // true = Balances, false = Expenses

  // Classes para o estado ativo
  const activeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white';
  // Classes para o estado inativo
  const inactiveButtonClass = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  // Classes comuns a ambos os botões
  const commonButtonClasses =
    'cursor-pointer font-medium py-2 px-6 rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';

  let group = useLoaderData(); // Assume que o loader está fornecendo o objeto do grupo

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <h1
            className="text-3xl font-semibold text-gray-800"
            role="heading"
            aria-level="1"
          >
            {group.name}
          </h1>
        </header>

        {/* Balance Section */}
        <section
          className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col items-center"
          aria-labelledby="total-balance-heading"
        >
          {/* O h2 original tinha text-align: center, mas no wireframe está à esquerda. Mantive como no wireframe original */}
          <h2
            id="total-balance-heading"
            className="text-2xl font-thin text-gray-700"
          >
            Total Gasto
          </h2>{' '}
          {/* Use sr-only para o título principal se o valor for o foco */}
          <div className="text-center">
            <p
              className="text-5xl font-bold text-green-600 mb-2"
              aria-live="polite"
            >
              {group.totalBalance}
            </p>
            <p className="text-gray-600 text-lg">Este mês</p>
          </div>
          <div className="flex space-x-4 mt-6">
            <ButtonUI
              fn={() => setShowBalanceOrExpensesList(true)}
              title="Balances" // Traduzido
              className={`${commonButtonClasses} ${showBalanceOrExpensesList ? `${activeButtonClass} focus:ring-blue-500` : `${inactiveButtonClass} focus:ring-gray-400`}`}
              aria-label="View balance details" // Traduzido
            ></ButtonUI>
            <ButtonUI
              fn={() => setShowBalanceOrExpensesList(false)}
              title="Expenses" // Traduzido
              className={`${commonButtonClasses} ${!showBalanceOrExpensesList ? `${activeButtonClass} focus:ring-blue-500` : `${inactiveButtonClass} focus:ring-gray-400`}`}
              aria-label="View expense details" // Traduzido
            ></ButtonUI>
          </div>
        </section>
        {/* Renderiza BalancesList ou ExpensesList baseado no estado */}
        {showBalanceOrExpensesList ? (
          <BalancesList group={group} />
        ) : (
          <ExpensesList group={group} />
        )}
      </main>
    </div>
  );
}
