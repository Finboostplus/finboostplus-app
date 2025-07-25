import { Form } from 'react-router';
import ButtonUI from '../../components/ui/Button';
import { useState } from 'react';
import CustomSplitAmount from './CustomSplitAmount';
import FormFieldsExpenses from './FormFieldsExpenses';

export default function Expenses() {
  const [splitType, setSplitType] = useState('personalize');
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Nova Despesa</h1>
      <Form
        method="post"
        className="grid md:grid-cols-2 gap-4 max-md:flex max-md:flex-col"
        aria-label="Formulário para adicionar nova despesa"
      >
        <FormFieldsExpenses />

        {/* <!-- Como dividir --> */}
        <div className="col-span-2">
          <p className="font-semibold mt-4">Como dividir?</p>
          <div
            className="flex gap-4 mt-2"
            role="group"
            aria-label="Método de divisão"
          >
            <ButtonUI
              title="Dividir igual"
              fnClick={() => setSplitType('equal')}
              type="button"
              className={`${splitType === 'equal' ? 'bg-blue-600 text-white' : 'opacity-50'} p-2 border rounded cursor-pointer transition-all`}
            />
            <ButtonUI
              title="Personalizar"
              fnClick={() => setSplitType('personalize')}
              type="button"
              className={`${splitType === 'personalize' ? 'bg-blue-600 text-white' : 'opacity-50'} p-2 border rounded cursor-pointer transition-all`}
            />
          </div>
        </div>

        {splitType === 'personalize' && <CustomSplitAmount />}

        {/* Botão */}
        <div className="col-span-2 mt-6">
          <ButtonUI
            title="Adicionar Despesa"
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={true}
          ></ButtonUI>
        </div>
      </Form>
    </section>
  );
}
