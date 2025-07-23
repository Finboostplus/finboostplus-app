import { useLoaderData } from 'react-router';
import ButtonUI from '../../../components/ui/Button';
import BalancesList from './BalancesList';
import ExpensesList from './ExpensesList';
import { useState } from 'react';
import ModalButton from './ModalButton';
import Expenses from '../../Expenses';

export default function GroupDetails() {
  const [showBalanceOrExpensesList, setShowBalanceOrExpensesList] =
    useState(true);

  const activeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white';
  const inactiveButtonClass = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  const commonButtonClasses =
    'cursor-pointer font-medium py-2 px-4 sm:px-6 text-sm sm:text-base rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';

  const group = useLoaderData();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1
            className="text-2xl sm:text-3xl font-semibold text-gray-800"
            role="heading"
            aria-level="1"
          >
            {group.name}
          </h1>
        </header>

        <section
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 flex flex-col items-center! sm:items-start text-center sm:text-left"
          aria-labelledby="total-balance-heading"
        >
          <h2
            id="total-balance-heading"
            className="text-xl sm:text-2xl font-thin text-gray-700"
          >
            Total Gasto
          </h2>
          <div className="mt-2 sm:mt-0">
            <p
              className="text-4xl sm:text-5xl font-bold text-green-600 mb-1 sm:mb-2"
              aria-live="polite"
            >
              {group.totalBalance}
            </p>
            <p className="text-gray-600 text-center text-base sm:text-lg">
              Este mês
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
            <ButtonUI
              fnClick={() => setShowBalanceOrExpensesList(true)}
              title="Saldos"
              className={`${commonButtonClasses} ${
                showBalanceOrExpensesList
                  ? `${activeButtonClass} focus:ring-blue-500`
                  : `${inactiveButtonClass} focus:ring-gray-400`
              }`}
              aria-label="Ver detalhes de saldos"
            />
            <ButtonUI
              fnClick={() => setShowBalanceOrExpensesList(false)}
              title="Despesas"
              className={`${commonButtonClasses} ${
                !showBalanceOrExpensesList
                  ? `${activeButtonClass} focus:ring-blue-500`
                  : `${inactiveButtonClass} focus:ring-gray-400`
              }`}
              aria-label="Ver detalhes de despesas"
            />
          </div>
        </section>

        {showBalanceOrExpensesList ? (
          <BalancesList group={group} />
        ) : (
          <ExpensesList group={group} />
        )}
      </main>

      {/* ModalButton pode ser ajustado também se necessário */}
      <ModalButton modalChildren={<Expenses />} />
    </div>
  );
}
