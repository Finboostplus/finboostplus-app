import { useNavigate } from 'react-router';
import ButtonUI from '../ui/Button';
import { FaUsers, FaWallet, FaChartPie } from 'react-icons/fa';

export default function EmptyGroupInvite() {
  const navigate = useNavigate();

  return (
    <div className="w-full p-10 bg-surface border border-surface/40 rounded-2xl shadow-md text-center space-y-8 animate-fade-in">
      {/* Ícone grande */}
      <div className="flex flex-col items-center gap-3">
        <div className="p-5 rounded-full bg-primary/15 text-primary shadow-sm">
          <FaWallet size={42} />
        </div>

        <h2 className="text-2xl font-bold text-text tracking-tight">
          Comece Sua Organização Financeira
        </h2>

        <p className="text-text max-w-lg leading-relaxed">
          Você ainda não criou um grupo. Os grupos são a base para gerenciar
          despesas, dividir valores e acompanhar sua saúde financeira.
        </p>
      </div>

      {/* Mini indicadores financeiros (fake) para dar cara de dashboard */}
      <div className="flex items-center justify-center gap-6">
        <div className="select-none flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-surface/20 w-32 shadow-sm">
          <FaChartPie className="text-primary mb-1" size={22} />
          <span className="text-sm text-text">Categorias</span>
          <span className="text-base font-semibold text-text">0</span>
        </div>

        <div className="select-none flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-surface/20 w-32 shadow-sm">
          <FaUsers className="text-primary mb-1" size={22} />
          <span className="text-sm text-text">Participantes</span>
          <span className="text-base font-semibold text-text">0</span>
        </div>
      </div>

      <ButtonUI
        className="bg-primary cursor-pointer px-7 py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-white"
        onClick={() => navigate('/groups?create')}
      >
        Criar meu primeiro grupo
      </ButtonUI>
    </div>
  );
}
