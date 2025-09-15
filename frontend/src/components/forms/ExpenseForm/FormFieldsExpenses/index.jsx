import categories from '../../../../mockData/categories';

import { getCurrentDate } from '../../../../utils/helpers';
import InputUI from '../../../ui/Input';
import SelectUI from '../../../ui/Select';
import TextareaUI from '../../../ui/Textarea';
import { useFormExpense } from '../useForm';
import CurrencyInputUI from '../../../ui/CurrencyInput';

export default function FormFieldsExpenses({ members }) {
  const { setAmount } = useFormExpense();

  const handleAmountChange = ({ float: numericValue }) => {
    // Converte o valor formatado para número
    setAmount(numericValue);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-auto p-4">
      <div className="grid gap-4 flex-1">
        {/* Título e Valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title_expense"
              className="block text-sm font-semibold text-text mb-1"
            >
              Título
            </label>
            <InputUI
              id="title_expense"
              name="title_expense"
              placeholder="Ex: Jantar com amigos"
              className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="total_amount"
              className="block text-sm font-semibold text-text mb-1"
            >
              Valor
            </label>
            <CurrencyInputUI
              id="total_amount"
              type="text"
              allowNegativeValue={false}
              onValueChange={(value, name, values) =>
                handleAmountChange(values)
              }
              name="total_amount"
              placeholder="R$ 0,00"
              required
              className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
        </div>

        {/* Restante do formulário permanece igual */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-text mb-1"
          >
            Data
          </label>
          <InputUI
            id="date"
            type="date"
            name="date"
            min={getCurrentDate()}
            required
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-text mb-1"
          >
            Descrição
          </label>
          <TextareaUI
            id="description"
            name="description"
            placeholder="Ex: Restaurante italiano no centro"
            required
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none h-[150px]"
          />
        </div>

        <div>
          <label
            htmlFor="category_id"
            className="block text-sm font-semibold text-text mb-1"
          >
            Categoria
          </label>
          <SelectUI
            id="category_id"
            name="category_id"
            required
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer"
          >
            {categories.map(({ id, name }) => (
              <option key={id} value={id.toString()}>
                {name}
              </option>
            ))}
          </SelectUI>
        </div>

        <div>
          <label
            htmlFor="payer_id"
            className="block text-sm font-semibold text-text mb-1"
          >
            Quem pagou?
          </label>
          <SelectUI
            id="payer_id"
            name="payer_id"
            required
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          >
            {members.map((member, i) => (
              <option key={i} value={i}>
                {member.name}
              </option>
            ))}
          </SelectUI>
        </div>
      </div>
    </div>
  );
}
