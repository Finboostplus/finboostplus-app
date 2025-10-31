import { FaPiggyBank, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-surface-dark text-text dark:text-text-dark p-6 transition-colors duration-300">
      <div className="flex flex-col items-center text-center animate-fadeIn">
        <FaPiggyBank className="w-20 h-20 text-primary dark:text-primary-dark mb-4" />
        <h1 className="text-5xl font-extrabold text-primary dark:text-primary-dark mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
        <p className="text-sm sm:text-base max-w-md text-muted dark:text-muted-dark mb-6">
          Parece que essa página, grupo ou despesa não existe mais.
          <br />
          Verifique o link ou volte para o painel principal do FinBoost+.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary dark:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all duration-300"
        >
          <FaArrowLeft className="text-white" />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
