import { Form, useParams } from 'react-router';
import FormFieldsExpenses from './FormFieldsExpenses';
import ButtonUI from '../../ui/Button';
import CustomSplitAmount from './CustomSplitAmount';
import { useFormExpense } from './useForm';
import { useEffect, useState, useCallback } from 'react';
import userData from '../../../mockData/user/user.data';
import { customToast } from '../../CustomToast';

export default function ExpenseForm() {
  const params = useParams();
  const group = userData.groups.find(({ id }) => id === params['group-id']);
  const groupMembers = group?.members || [];

  const { setMembers, amount, divisionAmount, remainingDifference, reset } =
    useFormExpense();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializa membros do grupo
  useEffect(() => {
    setMembers(groupMembers.map(m => m.name));
  }, [groupMembers, setMembers]);

  // Reseta store ao desmontar
  useEffect(() => reset, [reset]);

  const isDistributionValid = remainingDifference <= 0.01;

  const handleExpenseSubmit = useCallback(
    async e => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        // Validações
        ['title_expense', 'date', 'payer_id'].forEach(field => {
          if (!formValues[field]) throw new Error(`${field} é obrigatório.`);
        });

        // Monta payload
        const expenseData = {
          title: formValues.title_expense,
          description: formValues.description || '',
          date: formValues.date,
          amount: Number(amount),
          payer_id: Number(formValues.payer_id),
          category_id: Number(formValues.category_id),
          group_id: params['group-id'],
          splits: Object.entries(divisionAmount).map(([member, { float }]) => ({
            member_name: member,
            amount: float || 0,
          })),
        };

        if (!isDistributionValid) {
          throw new Error(
            'A distribuição de valores não corresponde ao total da despesa.'
          );
        }

        console.log('Dados da despesa preparados:', expenseData);
        // await api.post('/expenses', expenseData);
        customToast(
          'Nova despesa',
          'Despesa adicionada com sucesso!',
          'success'
        );
      } catch (err) {
        console.error(err);
        alert(`Erro: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [amount, divisionAmount, isDistributionValid, params, groupMembers]
  );

  return (
    <div className=" bg-surface dark:bg-surface-dark rounded-xl space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-center md:text-left">
          Adicionar nova despesa
        </h2>
        <p className="text-sm text-muted dark:text-muted-dark mt-1">
          Preencha os detalhes abaixo para adicionar uma despesa ao grupo{' '}
          <strong>{group?.name || ''}</strong>.
        </p>
      </div>

      <Form
        onSubmit={handleExpenseSubmit}
        method="post"
        className="grid md:grid-cols-[100%] max-md:flex max-md:flex-col gap-6"
        aria-label="Formulário para adicionar nova despesa"
      >
        <FormFieldsExpenses members={groupMembers} />
        <CustomSplitAmount members={groupMembers} />

        <div className="col-span-2 mt-4">
          <ButtonUI
            disabled={!isDistributionValid || isSubmitting}
            aria-disabled={!isDistributionValid || isSubmitting}
            type="submit"
            className={`bg-primary hover:bg-secondary text-white py-3 px-6 rounded w-full sm:w-auto font-semibold transition ${
              !isDistributionValid || isSubmitting
                ? 'opacity-50 cursor-not-allowed disabled:bg-gray-400'
                : ''
            }`}
          >
            <span>{isSubmitting ? 'Enviando...' : 'Adicionar Despesa'}</span>
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
}
