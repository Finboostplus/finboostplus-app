import { useEffect, useState } from 'react';
import { useFormExpense } from '../useForm';
import CurrencyInputUI from '../../../ui/CurrencyInput';
import { formatBRL } from '../../../../utils/formatters';
import { FiCheck } from 'react-icons/fi';

export default function CustomSplitAmount({ members }) {
  const {
    amount,
    divisionAmount,
    redistributeEvenly,
    getRemainingDifference,
    isBalanced,
  } = useFormExpense();

  // Divide igualmente apenas na primeira renderização
  useEffect(() => {
    if (members?.length && amount > 0) {
      const hasAnyValue = Object.values(divisionAmount).some(v => v?.float > 0);
      if (!hasAnyValue) redistributeEvenly();
    }
  }, []); // executa apenas 1x

  const remainingDifference = getRemainingDifference();
  const balanced = isBalanced();

  return (
    <div className="col-span-2 mt-6">
      <h3 className="text-lg font-semibold text-text mb-3">
        💰 Distribuição personalizada
      </h3>

      <div className="flex flex-col gap-3">
        {members.map(({ id, name }) => {
          const member = divisionAmount[id] || { float: 0, formatted: '' };
          return (
            <CustomMemberInput
              key={id}
              balanced={balanced}
              member={{ id, member, name }}
            />
          );
        })}
      </div>

      {/* Status de equilíbrio */}
      {amount > 0 && (
        <div
          className={`mt-6 rounded-xl border p-3 text-sm font-medium text-center transition ${
            balanced
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-yellow-50 border-yellow-200 text-yellow-700'
          }`}
        >
          {balanced ? (
            <span className="flex items-center justify-center gap-1">
              <span>✅</span> Distribuição correta
            </span>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p>
                ⚠️ Diferença restante:{' '}
                <span className="font-semibold">
                  {formatBRL(remainingDifference)}
                </span>
              </p>
              <button
                type="button"
                onClick={redistributeEvenly}
                className="text-sm px-3 py-1.5 rounded-md bg-primary/80 hover:bg-primary text-white transition"
              >
                Redistribuir igualmente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CustomMemberInput({ balanced, member: { id, member, name } }) {
  const { updateMemberShare } = useFormExpense();
  const [localValue, setLocalValue] = useState('');
  const [hasChanged, setHasChanged] = useState(false);

  const valueColor =
    member.float === 0
      ? 'text-muted'
      : balanced
        ? 'text-success'
        : 'text-error';

  // função chamada ao confirmar manualmente
  const handleConfirm = () => {
    updateMemberShare(id, localValue);
    setHasChanged(false);
  };

  return (
    <div
      key={id}
      className="flex flex-col gap-2 bg-surface border border-border rounded-xl p-3 shadow-sm hover:shadow transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text/90">{name}</span>
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${valueColor}`}
        >
          Participação: {member.float ? formatBRL(member.float) : 'R$ 0,00'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CurrencyInputUI
          name={String(id)}
          /* value={localValue} */
          placeholder="Digite o valor"
          onValueChange={(_, __, values) => {
            setLocalValue(values?.float ?? '');
            setHasChanged(true);
          }}
          className="flex-1 p-2 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary/40 transition outline-none"
        />

        {/* Botão de confirmação aparece só se houver mudança */}
        {hasChanged && localValue !== '' && (
          <button
            type="button"
            onClick={handleConfirm}
            title="Confirmar valor?"
            className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition flex items-center justify-center cursor-pointer"
            aria-label="Confirmar valor"
          >
            <FiCheck size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
