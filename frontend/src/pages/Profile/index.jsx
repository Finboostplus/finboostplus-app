import {
  FaEdit,
  FaQuestionCircle,
  FaInfoCircle,
  FaUsers,
} from 'react-icons/fa';
import ButtonUI from '../../components/ui/Button';
import ActiveGroups from './ActiveGroups';
import StatBox, { FavoriteCategory } from './Stats';
import userData from '../../mockData/user/user.data';

export default function Profile() {
  const current_user = userData;
  return (
    <main className="flex-1 p-4 max-w-5xl mx-auto w-full font-principal text-text bg-surface transition-colors">
      {/* Cabeçalho do perfil */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: current_user.color }}
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-primary shadow"
          >
            {current_user.username[0]}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-text">
              {current_user.username}
            </h1>
            <p className="text-sm text-muted">{current_user.email}</p>
          </div>
        </div>
      </header>

      {/* Estatísticas rápidas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatBox
          number="12"
          label="Grupos"
          color="bg-primary/20"
          icon={<FaUsers className="text-primary" />}
        />
        <StatBox number="45" label="Despesas" color="bg-success/20" />
        <FavoriteCategory />
      </section>

      {/* Grupos ativos */}
      <ActiveGroups />

      {/* Ações */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
      </section>
    </main>
  );
}

const ActionButton = ({ icon, label }) => (
  <ButtonUI
    icon={icon}
    title={label}
    type="button"
    className="flex items-center justify-start gap-3 w-full border border-neutral px-4 py-3 rounded-xl bg-surface hover:bg-neutral transition shadow-sm"
    aria-label={label}
  >
    <span className="text-lg text-primary">{icon}</span>
    <span className="font-medium text-text">{label}</span>
  </ButtonUI>
);
