import { useLoaderData } from 'react-router';
import { useState } from 'react';
import ButtonUI from '../../../components/ui/Button';
import BalancesList from './BalancesList';
import ExpensesList from './ExpensesList';
import ModalButton from './ModalButton';
import Expenses from '../../Expenses';
import { formatBRL } from '../../../utils/formatters';

export default function GroupDetails() {
  const [showBalances, setShowBalances] = useState(true);
  const group = useLoaderData();

  const activeBtn =
    'bg-primary text-white hover:bg-primary/90 focus:ring-primary';
  const inactiveBtn =
    'bg-neutral text-text hover:bg-neutral/80 focus:ring-muted';
  const baseBtn =
    'cursor-pointer font-medium py-2 px-4 sm:px-6 text-sm sm:text-base rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';

  return (
    <div className="flex flex-col min-h-screen bg-neutral font-principal">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1
            className="text-2xl sm:text-3xl font-semibold text-text"
            role="heading"
            aria-level="1"
          >
            {group.name}
          </h1>
        </header>

        <section
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 flex flex-col items-center sm:items-start text-center sm:text-left"
          aria-labelledby="group-total-heading"
        >
          <h2
            id="group-total-heading"
            className="text-xl sm:text-2xl font-light text-text"
          >
            Total do grupo
          </h2>

          <div className="mt-2 sm:mt-0">
            <p
              className="text-4xl sm:text-5xl font-bold text-success mb-1 sm:mb-2"
              aria-live="polite"
            >
              {formatBRL(group.totalBalance)}
            </p>
            <p className="text-muted text-base sm:text-lg">acumulado do mês</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
            <ButtonUI
              fnClick={() => setShowBalances(true)}
              title="Saldos"
              className={`${baseBtn} ${showBalances ? activeBtn : inactiveBtn}`}
              aria-label="Ver saldos entre os membros"
            />
            <ButtonUI
              fnClick={() => setShowBalances(false)}
              title="Despesas"
              className={`${baseBtn} ${
                !showBalances ? activeBtn : inactiveBtn
              }`}
              aria-label="Ver despesas recentes do grupo"
            />
          </div>
        </section>

        {showBalances ? (
          <BalancesList group={group} />
        ) : (
          <ExpensesList group={group} />
        )}
      </main>

      <ModalButton modalChildren={<Expenses />} />
    </div>
  );
}
