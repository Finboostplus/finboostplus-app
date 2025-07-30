import { GrMoney } from 'react-icons/gr';
import { MdCreditCardOff } from 'react-icons/md';
import CardUI from '../ui/Card';
import userData from '../../mockData/user/user.data';
import { formatBRL } from '../../utils/formatters';

export default function SummaryCards() {
  const current_user = userData;
  const totalBalanceBRL = formatBRL(current_user.dashboard.totalBalance);
  const totalMonthlySpentBRL = formatBRL(
    current_user.dashboard.totalMonthlySpent
  );
  const isNegative = current_user.dashboard.totalBalance < 0;

  return (
    <CardUI className="grid grid-cols-2 gap-6 max-md:flex max-md:flex-col mb-6">
      {/* Saldo Total */}
      <CardUI
        className={`relative p-6 rounded-2xl shadow-md border
          ${
            isNegative
              ? 'border-error bg-error/10 text-error'
              : 'border-success bg-success/10 text-success'
          }
        `}
      >
        <p className="text-sm font-medium">Saldo Total</p>
        <p className="text-2xl font-extrabold mt-2">{totalBalanceBRL}</p>
        <GrMoney className="absolute right-4 top-4 w-[80px] h-[80px] opacity-20" />
      </CardUI>

      {/* Total Gasto */}
      <CardUI className="relative p-6 rounded-2xl shadow-md border border-muted bg-neutral text-text transition-colors">
        <p className="text-sm font-medium">Total Gasto (Mês)</p>
        <p className="text-2xl font-extrabold mt-2">{totalMonthlySpentBRL}</p>
        <MdCreditCardOff className="absolute right-4 top-4 w-[80px] h-[80px] opacity-20" />
      </CardUI>
    </CardUI>
  );
}
