import {
  FaEdit,
  FaQuestionCircle,
  FaInfoCircle,
  FaUsers,
} from 'react-icons/fa';
import ButtonUI from '../../components/ui/Button';
import ActiveGroups from './ActiveGroups';
import StatBox, { FavoriteCategory } from './Stats';

export default function Profile() {
  return (
    <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
      {/* Cabeçalho do perfil */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-primary shadow">
            J
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Usuário</h1>
            <p className="text-sm text-gray-500">usuario@provedor.com</p>
          </div>
        </div>
      </header>

      {/* Estatísticas rápidas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatBox
          number="12"
          label="Grupos"
          color="bg-blue-100"
          icon={<FaUsers className="text-blue-600" />}
        />
        <StatBox number="45" label="Despesas" color="bg-green-100" />
        <FavoriteCategory />
      </section>

      {/* Grupos ativos */}
      <ActiveGroups />

      {/* Ações */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <ActionButton icon={<FaEdit />} label="Editar Perfil" />
        <ActionButton icon={<FaQuestionCircle />} label="Ajuda e Suporte" />
        <ActionButton icon={<FaInfoCircle />} label="Sobre o App" />
      </section>
    </main>
  );
}

const ActionButton = ({ icon, label }) => (
  <ButtonUI
    icon={icon}
    title={label}
    type="button"
    className="flex items-center justify-start gap-3 w-full border border-gray-200 px-4 py-3 rounded-xl bg-white hover:bg-gray-50 transition shadow-sm"
    aria-label={label}
  >
    <span className="text-lg text-primary">{icon}</span>
    <span className="font-medium text-gray-700">{label}</span>
  </ButtonUI>
);
