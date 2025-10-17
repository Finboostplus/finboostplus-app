import { useLoaderData } from 'react-router';
import { useState } from 'react';
import { FiSettings, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import ButtonUI from '../../../components/ui/Button';
import BalancesList from './BalancesList';
import ExpensesList from './ExpensesList';

import Expenses from '../../Expenses';
import { formatBRL } from '../../../utils/formatters';
import ModalButton from '../../../components/Modal/ModalButton';

export default function GroupDetails() {
  const group = useLoaderData();
  const [showBalances, setShowBalances] = useState(true);

  // classes reutilizáveis
  const baseBtn =
    'cursor-pointer font-medium py-2 px-4 sm:px-6 text-sm sm:text-base rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const activeBtn =
    'bg-primary text-white hover:bg-primary/90 focus:ring-primary';
  const inactiveBtn =
    'bg-neutral text-text hover:bg-neutral/80 focus:ring-muted';

  return (
    <div className="flex flex-col min-h-screen bg-neutral font-principal transition-colors">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        {/* Cabeçalho */}
        <header className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-semibold text-text"
              role="heading"
              aria-level={1}
            >
              {group.name}
            </h1>
            <p className="text-sm text-muted mt-1">
              Visualize os saldos entre membros e acompanhe as despesas do
              grupo.
            </p>
          </div>

          {/* Menu de ações */}
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              className="flex items-center justify-center p-2 bg-primary/70 hover:bg-primary text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              aria-label="Abrir menu de ações do grupo"
            >
              <FiSettings className="text-xl" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-surface shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
              <MenuItem>
                {({ active }) => (
                  <a
                    href={`/groups/${group.id}/settings`}
                    className={`${
                      active ? 'bg-primary/10 text-primary' : 'text-text'
                    } flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors cursor-pointer`}
                  >
                    <FiEdit2 />
                    Configurações
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-red-50 text-red-600' : 'text-red-500'
                    } flex items-center gap-2 w-full px-4 py-2 text-sm rounded-md transition-colors cursor-pointer`}
                    onClick={() => console.log('Excluir grupo')}
                  >
                    <FiTrash2 />
                    Excluir grupo
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </header>

        {/* Total do grupo */}
        <section
          className="bg-surface p-4 sm:p-6 rounded-lg shadow-md mb-8 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors"
          aria-labelledby="group-total-heading"
        >
          <h2
            id="group-total-heading"
            className="text-xl sm:text-2xl font-light text-text"
          >
            Total do grupo
          </h2>

          <div className="mt-2">
            <p
              className={`text-4xl sm:text-5xl font-bold ${
                group.totalBalance >= 0 ? 'text-success' : 'text-red-500'
              } mb-1`}
              aria-live="polite"
            >
              {formatBRL(group.totalBalance)}
            </p>
            <p className="text-muted text-base sm:text-lg">acumulado do mês</p>
          </div>

          {/* Botões: Saldos / Despesas */}
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

        {/* Conteúdo principal */}
        <section className="animate-fadeIn">
          {showBalances ? (
            <BalancesList group={group} />
          ) : (
            <ExpensesList group={group} />
          )}
        </section>
      </main>

      {/* Modal de adicionar despesa */}
      <ModalButton modalChildren={<Expenses />} />
    </div>
  );
}
