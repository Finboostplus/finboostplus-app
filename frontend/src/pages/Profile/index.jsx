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
    <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
      <header className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white bg-purple-700">
            J
          </div>
          <div>
            <h1 className="text-xl font-semibold">Usuário</h1>
            <p className="text-sm text-gray-500">usuario@provedor.com</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatBox
          number="12"
          label="Grupos"
          color="bg-blue-200"
          icon={<FaUsers />}
        />
        <StatBox number="45" label="Despesas" color="bg-green-200" />
        <FavoriteCategory />
      </section>
      <ActiveGroups />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    type={'submit'}
    className="flex items-center cursor-pointer gap-2 border rounded-full px-4 py-2 hover:bg-gray-100"
    aria-label={label}
  >
    <span className="text-xl text-blue-800">{icon}</span>
    <span className="font-semibold">{label}</span>
  </ButtonUI>
);
