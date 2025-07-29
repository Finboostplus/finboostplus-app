import { formatBRL } from '../../../utils/formatters';

export default function BalancesList({ group }) {
  return (
    <>
      {/* Pending Debts/Credits Section */}
      <section
        className="bg-surface p-6 rounded-lg shadow-md mb-8 transition-colors"
        aria-labelledby="pending-balances-heading"
      >
        <h2
          id="pending-balances-heading"
          className="text-xl font-semibold text-text border-b border-muted pb-4 mb-4"
        >
          Saldos
        </h2>

        <div className="space-y-6">
          {group.pendingDebts.length > 0 && (
            <div className="flex justify-between items-center text-error font-semibold text-lg">
              <span>Quem deve para você</span>
              <span aria-label="Valor devido">
                {formatBRL(group.pendingDebts[0].amount)}
              </span>
            </div>
          )}

          {group.youOwe.length > 0 && (
            <div className="flex justify-between items-center text-success font-semibold text-lg">
              <span>Você deve para alguém</span>
              <span aria-label="Valor que você deve">
                {formatBRL(group.youOwe[0].amount)}
              </span>
            </div>
          )}

          {group.pendingDebts.length === 0 && group.youOwe.length === 0 && (
            <p className="text-muted text-center italic">
              Nenhum saldo pendente no momento.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
