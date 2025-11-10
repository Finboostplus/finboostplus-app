import { FaPiggyBank, FaArrowLeft } from 'react-icons/fa';
import { Link, useRouteError } from 'react-router';
import { AppError } from '../../utils/errors';

export default function NotFound() {
  const rawError = useRouteError();
  const error = AppError.from(rawError);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-surface-dark text-text dark:text-text-dark p-6 transition-colors duration-300">
      <div className="flex flex-col items-center text-center animate-fadeIn">
        <FaPiggyBank className="w-20 h-20 text-primary dark:text-primary-dark mb-4" />
        <h1 className="text-5xl font-extrabold text-primary dark:text-primary-dark mb-2">
          {error.status}
        </h1>
        <h2 className="text-2xl font-semibold mb-2">{error.statusText}</h2>
        <p className="text-sm sm:text-base max-w-md text-muted dark:text-muted-dark mb-6">
          {error.message}
        </p>

        <Link
          to={error.btn.path}
          className="inline-flex items-center gap-2 bg-primary dark:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all duration-300"
        >
          <FaArrowLeft className="text-white" />
          {error.btn.label}
        </Link>
      </div>
    </div>
  );
}
