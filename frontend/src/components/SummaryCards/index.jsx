import { GrMoney } from 'react-icons/gr';
import { MdCreditCardOff } from 'react-icons/md';
import CardUI from '../ui/Card';

export default function SummaryCards({ saldo }) {
  const isNegativeBalance =
    saldo < 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
  return (
    <CardUI className="grid grid-cols-2 max-md:flex max-md:flex-col gap-4 mb-6 relative top-[-20px]">
      <CardUI className={`relative p-8 rounded shadow ${isNegativeBalance}`}>
        <p className="text-sm font-medium">Saldo Total</p>
        <p className="text-xl font-bold">R$ {saldo}</p>
        <GrMoney className="absolute right-2 top-2 size-[100px] opacity-30" />
      </CardUI>
      <CardUI className="bg-gray-100 relative text-gray-700 p-8 rounded shadow">
        <p className="text-sm font-medium">Total Gasto (Mês)</p>
        <p className="text-xl font-bold">R$ 1.234,56</p>
        <MdCreditCardOff className="absolute right-2 top-2 size-[100px] opacity-30" />
      </CardUI>
    </CardUI>
  );
}
