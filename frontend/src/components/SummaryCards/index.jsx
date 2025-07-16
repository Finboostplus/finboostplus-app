import CardUI from '../ui/Card';

export default function SummaryCards() {
  return (
    <CardUI className="grid grid-cols-2 gap-4 mb-6 relative top-[-20px]">
      <CardUI className="bg-red-100 text-red-700 p-8 rounded shadow">
        <p className="text-sm font-medium">Saldo Total</p>
        <p className="text-xl font-bold">- R$ 47,50</p>
      </CardUI>
      <CardUI className="bg-blue-100 text-blue-700 p-8 rounded shadow">
        <p className="text-sm font-medium">Total Gasto (Mês)</p>
        <p className="text-xl font-bold">R$ 1.234,56</p>
      </CardUI>
    </CardUI>
  );
}
