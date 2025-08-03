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

export default function Profile() {
  const current_user = userData;

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full font-principal text-text bg-surface transition-colors">
      {/* Cabeçalho */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: current_user.color }}
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-md"
          >
            {current_user.username[0]}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{current_user.username}</h1>
            <p className="text-sm text-muted">{current_user.email}</p>
          </div>
        </div>
      </header>

      {/* Estatísticas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatBox
          number={current_user.groups.length}
          label="Grupos"
          color="border-b-4 border-primary"
          icon={<FaUsers className="text-primary size-9" />}
        />
        <StatBox
          icon={<FaMoneyBillWave className="text-success size-9" />}
          number={formatBRL(current_user.dashboard.totalMonthlySpent)}
          label="Despesas"
          color="border-b-4 border-success"
        />
        <FavoriteCategory topCategory={current_user.topCategory} />
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
          <ActionButton
            icon={<FaEdit className="text-primary" />}
            label="Editar Perfil"
          />
          <ActionButton
            icon={<FaQuestionCircle className="text-primary" />}
            label="Ajuda e Suporte"
          />
          <ActionButton
            icon={<FaInfoCircle className="text-primary" />}
            label="Sobre o App"
          />
        </div>
      </section>
    </main>
  );
}

function ActionButton({ icon, label }) {
  return (
    <ButtonUI
      icon={icon}
      type="button"
      title={label}
      className="flex items-center gap-3 w-full p-4 rounded-xl border-l-4 border-primary bg-background hover:bg-muted cursor-pointer"
      aria-label={label}
    />
  );
}
