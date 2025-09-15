import { useFormExpense } from '../useForm';
import CurrencyInputUI from '../../../ui/CurrencyInput';
import { formatBRL } from '../../../../utils/formatters';

export default function CustomSplitAmount({ members }) {
  const {
    divisionAmount,
    updateMemberShare,
    remainingDifference,
    redistributeEvenly,
  } = useFormExpense();

  return (
    <div className="col-span-2 mt-4">
      <p className="font-semibold">Valores por pessoa</p>
      <div className="flex flex-col gap-2 mt-2">
        {members.map(({ id, name }) => (
          <div key={id || name} className="flex items-center gap-2">
            <span className="w-1/2">{name}</span>
            <CurrencyInputUI
              name={name}
              value={divisionAmount[name]?.value ?? ''}
              onValueChange={(_, __, values) => {
                updateMemberShare(name, values);
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <div
        className={`mt-4 p-2 rounded ${
          Math.abs(remainingDifference) < 0.01
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {Math.abs(remainingDifference) < 0.01 ? (
          '✓ Distribuição correta'
        ) : (
          <>
            <p>⚠️ Diferença: {formatBRL(remainingDifference)}</p>
            <button
              type="button"
              onClick={redistributeEvenly}
              className="mt-2 text-sm text-white bg-primary/70 hover:bg-primary transition rounded-md p-2"
            >
              Redistribuir igualmente
            </button>
          </>
        )}
      </div>
    </div>
  );
}
