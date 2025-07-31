import { Form } from 'react-router';
import ButtonUI from '../../components/ui/Button';
import { useState } from 'react';
import CustomSplitAmount from './CustomSplitAmount';
import FormFieldsExpenses from './FormFieldsExpenses';

export default function Expenses() {
  const [splitType, setSplitType] = useState('personalize');

  const activeBtnClasses =
    'bg-[var(--color-primary)] text-white border-transparent';
  const inactiveBtnClasses =
    'bg-[var(--color-neutral)] text-[var(--color-text)] border border-gray-300 hover:bg-[var(--color-secondary)] hover:text-white transition';

  return (
    <section className="p-6 max-w-4xl mx-auto font-[var(--font-principal)] text-[var(--color-text)]">
      <h1 className="text-2xl font-semibold mb-6">Nova Despesa</h1>
      <Form
        method="post"
        className="grid md:grid-cols-2 gap-6 max-md:flex max-md:flex-col"
        aria-label="Formulário para adicionar nova despesa"
      >
        <FormFieldsExpenses />

        {/* Como dividir */}
        <div className="col-span-2">
          <p className="font-semibold mt-4 mb-2">Como dividir?</p>
          <div
            className="flex gap-4"
            role="group"
            aria-label="Método de divisão"
          >
            <ButtonUI
              title="Dividir igual"
              fnClick={() => setSplitType('equal')}
              type="button"
              className={`py-2 px-4 rounded border cursor-pointer font-semibold ${splitType === 'equal' ? activeBtnClasses : inactiveBtnClasses}`}
              aria-pressed={splitType === 'equal'}
            />
            <ButtonUI
              title="Personalizar"
              fnClick={() => setSplitType('personalize')}
              type="button"
              className={`py-2 px-4 rounded border cursor-pointer font-semibold ${splitType === 'personalize' ? activeBtnClasses : inactiveBtnClasses}`}
              aria-pressed={splitType === 'personalize'}
            />
          </div>
        </div>

        {splitType === 'personalize' && <CustomSplitAmount />}

        {/* Botão de enviar */}
        <div className="col-span-2 mt-8">
          <ButtonUI
            title="Adicionar Despesa"
            type="submit"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white py-3 px-6 rounded w-full sm:w-auto font-semibold transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={true}
            aria-disabled={true}
          />
        </div>
      </Form>
    </section>
  );
}
