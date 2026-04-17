// StatBox.jsx
export default function StatBox({
  number,
  label,
  icon,
  color = 'bg-primary/10 border-b-4 border-primary',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-4 min-h-[100px] shadow-sm transition-all duration-200 ${color} hover:bg-opacity-20`}
    >
      {/* Ícone médio */}
      {icon && <div className="text-2xl">{icon}</div>}

      {/* Label menor, secundário */}
      <p className="text-xs uppercase text-muted tracking-wide font-medium text-center">
        {label}
      </p>

      {/* Número principal, maior destaque */}
      <p className="text-md font-bold text-text text-center">{number}</p>
    </div>
  );
}

// FavoriteCategory.jsx
import { MdCategory } from 'react-icons/md';

export function FavoriteCategory({ topCategory }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border-b-4 border-purple-700 dark:border-purple-300 dark:bg-purple-900/20 min-h-[100px] transition-all duration-200 ">
      {/* Ícone médio */}
      <div className="text-2xl text-purple-700 dark:text-purple-300 mb-1">
        <MdCategory />
      </div>

      {/* Label menor, secundário */}
      <p className="text-xs uppercase text-muted tracking-wide text-center font-medium">
        Categoria Favorita
      </p>

      {/* Valor principal */}
      <p className="text-md font-semibold text-text dark:text-text text-center truncate max-w-full">
        {topCategory}
      </p>
    </div>
  );
}
