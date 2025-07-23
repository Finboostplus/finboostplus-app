export default function BalancesList({ group }) {
  return (
    <>
      {/* Pending Debts/Credits Section */}
      <section
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        aria-labelledby="pending-balances-heading"
      >
        <h2
          id="pending-balances-heading"
          className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4"
        >
          Saldos
        </h2>
        <div className="space-y-4">
          {group.pendingDebts.length > 0 && (
            <div className="flex justify-between items-center text-red-600">
              <span className="text-lg">Quem deve para você</span>
              <span className="font-semibold text-xl">
                {group.pendingDebts[0].amount}
              </span>
            </div>
          )}
          {group.youOwe.length > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-lg">Você deve para alguém</span>
              <span className="font-semibold text-xl">
                {group.youOwe[0].amount}
              </span>
            </div>
          )}
          {group.pendingDebts.length === 0 && group.youOwe.length === 0 && (
            <p className="text-gray-500">Nenhum saldo pendente no momento.</p>
          )}
        </div>
      </section>
    </>
  );
}
