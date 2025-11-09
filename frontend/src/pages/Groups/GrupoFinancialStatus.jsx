import { TbCurrencyDollar } from 'react-icons/tb';

import { TbCoin, TbUserDollar } from 'react-icons/tb';
import { formatBRL } from '../../utils/formatters';

export default function GroupFinancialStatus({ group, variant = 'compact' }) {
  const isPositive = group?.total <= 0;
  const colorClass = isPositive ? 'text-success' : 'text-error';
  const bgClass = isPositive
    ? 'bg-success/5 border-success/20'
    : 'bg-error/5 border-error/20';

  if (variant === 'compact') {
    return (
      <div
        className={`mt-3 px-3 py-2 items-center rounded-lg border text-sm flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center transition-all duration-300 ${bgClass}`}
      >
        <span className="flex items-center gap-2 text-muted">
          <TbCoin className={`text-base ${colorClass}`} />
          <span className={`font-medium ${colorClass}`}>
            {formatBRL(group?.total)}
          </span>
        </span>

        <span className="flex items-center gap-2 text-muted">
          <TbUserDollar className={`text-base ${colorClass}`} />
          <span
            className={`font-medium ${
              group?.partial_total <= 0 ? 'text-success' : 'text-error'
            }`}
          >
            {formatBRL(group?.partial_total)}
          </span>
        </span>
      </div>
    );
  }

  // --- DETAILED VARIANT ---
  return (
    <section
      className="bg-surface p-4 sm:p-6 rounded-lg shadow-md mb-8 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors"
      aria-labelledby="group-total-heading"
    >
      <h2
        id="group-total-heading"
        // text-xl sm:text-2xl font-semibold - Bom peso para um título principal
        className="text-xl sm:text-2xl font-semibold text-text"
      >
        Total de Despesas do Grupo
      </h2>

      <div className="mt-2 w-full">
        <p
          className={`text-4xl sm:text-5xl font-bold ${colorClass} mb-1`}
          aria-live="polite"
        >
          {formatBRL(group?.total)}
        </p>

        <p className="text-muted text-base sm:text-lg flex items-center gap-2">
          <TbUserDollar className={colorClass} />{' '}
          <span>Sua parte: {formatBRL(group?.partial_total ?? 0)}</span>
        </p>
      </div>
      {group.description && (
        <GroupDescription description={group.description} />
      )}
    </section>
  );
}

function GroupDescription({ description }) {
  return (
    <section className="w-full mt-4">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-success/10 text-success">
          <TbCurrencyDollar className="text-base" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-text">
          Descrição
        </h3>
      </div>

      {/* Corpo */}
      <div
        title="Descrição do grupo"
        className="rounded-xl border border-success/20 bg-success/5 p-4 shadow-sm hover:bg-success/10 transition-colors duration-300"
      >
        <p className="text-sm leading-relaxed text-text/90 whitespace-pre-line">
          {description}
        </p>
      </div>
    </section>
  );
}
