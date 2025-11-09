import {
  FaUsers,
  FaMoneyBillWave,
  FaEdit,
  FaQuestionCircle,
  FaInfoCircle,
} from 'react-icons/fa';
import ButtonUI from '../../components/ui/Button';
import ActiveGroups from './ActiveGroups';
import StatBox, { FavoriteCategory } from './Stats';
import userData from '../../mockData/user/user.data';
import { formatBRL } from '../../utils/formatters';

import { useState } from 'react';
import ProfileContent from './ProfileContent';
import { Link } from 'react-router';
import Modal from '../../components/Modal';

import useMeQuery from '../../hooks/ReactQuery/Queries/useMeQuery';
import { useMeDashboardQuery } from '../../hooks/ReactQuery/Queries/useMeDashboardStatsQuery';
import { useGroupsQuery } from '../../hooks/ReactQuery/Queries/useGroupsQuery';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getMeExpensesByMonthly } from '../../services/me';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyExpensesSummary } from '../../components/SummaryCards/expenseUtils';

export default function Profile() {
  const { data: user } = useMeQuery();
  const { data: dashboard } = useMeDashboardQuery();
  const { data } = useGroupsQuery();
  const { data: expensesResponse } = useQuery({
    queryKey: [REACTQUERY_KEYS.USER.DASHBOARD, 'balance'],
    queryFn: getMeExpensesByMonthly,
  });

  const summary = expensesResponse?.length
    ? getMonthlyExpensesSummary(expensesResponse)
    : { totalExpenses: 0 };
  const groupsLength = data?.groupsLength;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const current_user = userData;

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full font-principal text-text bg-surface transition-colors">
      {/* Cabeçalho */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: user?.themeColor }}
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-md"
          >
            {user?.name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{user?.name}</h1>
            <p className="text-sm text-muted">{user?.email}</p>
          </div>
        </div>
      </header>

      {/* Estatísticas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 **:h-full **:select-none">
        <Link to={'/groups'} className="group">
          <StatBox
            number={groupsLength}
            label="Grupos"
            color="border-b-4 border-primary group-hover:bg-muted/10"
            icon={<FaUsers className="text-primary text-2xl" />}
          />
        </Link>

        <StatBox
          number={formatBRL(summary.totalExpenses)}
          label="Despesas por ano"
          color="border-b-4 border-success"
          icon={<FaMoneyBillWave className="text-success text-2xl" />}
        />

        <FavoriteCategory
          topCategory={dashboard[0]?.category || 'Nenhuma Despesa Registrada'}
        />
      </section>

      {/* Grupos ativos */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Grupos Ativos</h2>
        <ActiveGroups />
      </section>

      {/* Ações rápidas */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Configurações e Suporte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ButtonUI
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 w-full p-4 rounded-xl border-l-4 border-primary bg-background hover:bg-muted/10 cursor-pointer "
          >
            <FaEdit className="text-primary w-10" />
            <span>Editar Perfil</span>
          </ButtonUI>
          <ButtonUI className="flex items-center gap-3 w-full p-4 rounded-xl border-l-4 border-primary bg-background hover:bg-muted/10 cursor-pointer">
            <FaQuestionCircle className="text-primary" />
            <span>Ajuda e Suporte</span>
          </ButtonUI>
          <ButtonUI className="flex items-center gap-3 w-full p-4 rounded-xl border-l-4 border-primary bg-background hover:bg-muted/10 cursor-pointer">
            <FaInfoCircle className="text-primary" />
            <span>Sobre o App</span>
          </ButtonUI>
        </div>
      </section>
      <Modal
        fnClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        children={
          <ProfileContent
            current_user={current_user}
            setIsModalOpen={setIsModalOpen}
          />
        }
      />
    </main>
  );
}
