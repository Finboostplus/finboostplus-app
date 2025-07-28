import { GrMoney } from 'react-icons/gr';
import { MdCreditCardOff } from 'react-icons/md';
import CardUI from '../ui/Card';

export default function SummaryCards({ saldo }) {
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(saldo);

  const isNegative = saldo < 0;

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
        <p className="text-2xl font-extrabold mt-2">{valorFormatado}</p>
        <GrMoney className="absolute right-4 top-4 w-[80px] h-[80px] opacity-20" />
      </CardUI>

      {/* Total Gasto */}
      <CardUI className="relative p-6 rounded-2xl shadow-md border border-muted bg-neutral-light text-text">
        <p className="text-sm font-medium">Total Gasto (Mês)</p>
        <p className="text-2xl font-extrabold mt-2">R$ 1.234,56</p>
        <MdCreditCardOff className="absolute right-4 top-4 w-[80px] h-[80px] opacity-20" />
      </CardUI>
    </CardUI>
  );
}
