import { formatBRL } from '../../../utils/formatters';

export default function BalancesList({ group }) {
  return (
    <>
      {/* Balances Section */}
      <section
        className="bg-surface dark:bg-surface-dark p-6 rounded-lg shadow-md mb-8 transition-colors"
        aria-labelledby="balances-heading"
      >
        <h2
          id="balances-heading"
          className="text-xl font-semibold text-text dark:text-text-dark border-b border-muted dark:border-muted-dark pb-4 mb-4"
        >
          Saldos do Grupo
        </h2>

        <div className="space-y-6">
          <GroupPendingDebts group={group} />
        </div>
      </section>
    </>
  );
}

function GroupPendingDebts({ group }) {
  const hasDebts = group.pendingDebts.length > 0;

  if (!hasDebts) {
    return (
      <p className="text-muted dark:text-muted-dark text-center italic">
        Nenhuma dívida pendente no grupo.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-text dark:text-text-dark">
        Dívidas pendentes:
      </h3>

      {group.pendingDebts.map(({ id, name, to, amount }) => {
        const fromColor = group.members.find(m => m.name === name)?.color;
        const toColor = group.members.find(m => m.name === to)?.color;

        return (
          <div key={id} className="flex justify-between items-center">
            <span className="text-text dark:text-text-dark">
              <span className="font-semibold" style={{ color: fromColor }}>
                {name}
              </span>{' '}
              deve para{' '}
              <span className="font-semibold" style={{ color: toColor }}>
                {to}
              </span>
            </span>
            <span
              className="font-semibold text-error dark:text-error-dark"
              aria-label={`Valor devido: ${formatBRL(amount)}`}
            >
              {formatBRL(amount)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
