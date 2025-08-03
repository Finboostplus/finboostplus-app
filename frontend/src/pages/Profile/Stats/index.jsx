import { MdCategory } from 'react-icons/md'; // Ícone literal de categoria

// StatBox.jsx
export default function StatBox({
  number,
  label,
  icon,
  color = 'bg-primary/10',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl p-4 min-h-[100px] shadow-sm transition-colors ${color}`}
    >
      {icon && <div className="text-xl text-primary">{icon}</div>}

      <p className="text-xs uppercase text-muted tracking-wide font-medium text-center">
        {label}
      </p>
      <p className="text-2xl font-bold text-text text-center">{number}</p>
    </div>
  );
}

// FavoriteCategory.jsx
export function FavoriteCategory({ topCategory }) {
  return (
    <div className="flex flex-col justify-center items-center p-4 rounded-2xl shadow-sm border-b-4 border-purple-700 dark:bg-purple-900/20 min-h-[100px] transition-colors">
      <div className="text-xl text-purple-700 dark:text-purple-300 mb-1">
        <MdCategory className="size-9" />
      </div>
      <p className="text-xs uppercase text-muted tracking-wide text-center font-medium">
        Categoria Favorita
      </p>
      <p className="text-lg font-semibold text-text dark:text-text text-center">
        {topCategory}
      </p>
    </div>
  );
}
