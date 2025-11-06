import { Form } from 'react-router';
import FormFieldsExpenses from './FormFieldsExpenses';
import ButtonUI from '../../ui/Button';
import CustomSplitAmount from './CustomSplitAmount';
import { useFormExpense } from './useForm';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { customToast } from '../../CustomToast';
import Modal from '../../Modal';
import ListMembers from './ListMembers';
import { FiUserPlus, FiX } from 'react-icons/fi';
import useMeQuery from '../../../hooks/ReactQuery/Queries/useMeQuery';
import { useCreateExpenseMutation } from '../../../hooks/ReactQuery/Mutations/useCreateExpenseMutation';
import { useMembersQuery } from '../../../hooks/ReactQuery/Queries/useMembersQuery';

export default function ExpenseForm({ groupData: group }) {
  const [search, setSearch] = useState(''); // termo final para API
  const { data: user } = useMeQuery();
  const useExpenseMutation = useCreateExpenseMutation(group?.id);
  const { data: { members: groupMembers = [], totalPages } = {}, isLoading } =
    useMembersQuery(group?.id, 0, search);

  const excludeSelf = true; // 🔧 se quiser incluir o próprio usuário, basta trocar para false

  // 🔍 Aplica filtro de exclusão do próprio usuário
  const filteredMembers = useMemo(() => {
    if (!groupMembers?.length) return [];
    return excludeSelf
      ? groupMembers.filter(m => m.id !== user?.id)
      : groupMembers;
  }, [groupMembers, user, excludeSelf]);

  const { setMembers, amount, divisionAmount, reset, getRemainingDifference } =
    useFormExpense();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // 🔄 Reseta store ao desmontar
  useEffect(() => reset, [reset]);

  // 👥 Atualiza membros selecionados
  useEffect(() => {
    setMembers(selectedMembers.length > 0 ? selectedMembers : []);
  }, [selectedMembers, setMembers]);

  // ⚖️ Verifica se a distribuição está correta
  const distributionOK =
    selectedMembers.length > 0 && Math.abs(getRemainingDifference()) < 0.01;

  // 📝 Envio do formulário
  const handleExpenseSubmit = useCallback(
    async e => {
      e.preventDefault();

      if (!distributionOK) {
        return customToast(
          'Erro',
          'A distribuição de valores não corresponde ao total da despesa.',
          'error'
        );
      }

      setIsSubmitting(true);

      try {
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        const expenseData = {
          title: formValues.title_expense,
          description: formValues.description || '',
          deadlineDate: formValues.date,
          expenseValue: Number(amount),
          categoryId: Number(formValues.category_id),
          expenseDivision: Object.entries(divisionAmount).map(
            ([memberId, val]) => ({
              id: Number(memberId),
              value: val.float,
            })
          ),
        };

        console.log('💾 Dados da despesa preparados:', expenseData);

        await useExpenseMutation.mutateAsync(expenseData, {
          onSuccess: () =>
            customToast(
              'Nova despesa',
              'Despesa adicionada com sucesso!',
              'success'
            ),
          onError: ({ response: { data: error } }) => {
            console.log({ error });
            customToast(error.title, error.message, 'error');
          },
          onSettled: () => setIsSubmitting(false),
        });
      } catch (err) {
        console.error(err);
        customToast(
          'Erro',
          err?.message || 'Ocorreu um erro inesperado.',
          'error'
        );
        setIsSubmitting(false);
      }
    },
    [amount, divisionAmount, distributionOK]
  );

  const removeMember = memberId => {
    setSelectedMembers(prev => prev.filter(m => m.id !== memberId));
  };

  return (
    <div className="bg-surface dark:bg-surface-dark rounded-xl space-y-6 p-6">
      {/* Cabeçalho */}
      <header>
        <h2 className="text-2xl font-bold text-center md:text-left">
          Adicionar nova despesa
        </h2>
        <p className="text-sm text-muted dark:text-muted-dark mt-1">
          Preencha os detalhes abaixo para adicionar uma despesa ao grupo{' '}
          <strong>{group?.name || ''}</strong>.
        </p>
      </header>

      <Form
        onSubmit={handleExpenseSubmit}
        method="post"
        className="grid md:grid-cols-[100%] max-md:flex max-md:flex-col gap-6"
        aria-label="Formulário para adicionar nova despesa"
      >
        {/* Campos principais */}
        <FormFieldsExpenses data={filteredMembers} />

        {/* Seleção de membros */}
        <div className="col-span-2 flex flex-col gap-2">
          {selectedMembers.length === 0 && filteredMembers.length > 0 && (
            <ButtonUI
              type="button"
              onClick={() => setShowMemberModal(true)}
              className="flex items-center gap-2 justify-center bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow shadow-sm cursor-pointer"
            >
              <FiUserPlus size={20} />
              Selecionar participantes
            </ButtonUI>
          )}

          {selectedMembers.length > 0 && (
            <div className="flex flex-col justify-center gap-2">
              <span className="text-xs font-bold">
                {selectedMembers.length > 1
                  ? 'Membros envolvidos'
                  : 'Membro envolvido'}{' '}
                na despesa:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map(member => (
                  <div
                    key={member.id}
                    className="flex items-center gap-1 bg-primary text-white text-sm px-2 py-1 rounded-full"
                  >
                    <span>{member.name}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="hover:text-error transition cursor-pointer"
                    >
                      <FiX size="20px" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divisão personalizada */}
        {selectedMembers.length > 0 && (
          <CustomSplitAmount members={selectedMembers} />
        )}

        {/* Botão de envio */}
        <div className="col-span-2 mt-4">
          <ButtonUI
            type="submit"
            disabled={isSubmitting || !distributionOK || amount <= 0}
            aria-disabled={isSubmitting || !distributionOK || amount <= 0}
            className={`bg-primary hover:bg-secondary text-white py-3 px-6 rounded w-full sm:w-auto font-semibold transition ${
              isSubmitting || !distributionOK || amount <= 0
                ? 'opacity-50 bg-gray-400! cursor-not-allowed!'
                : 'cursor-pointer'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Adicionar Despesa'}
          </ButtonUI>
        </div>
      </Form>

      {/* Modal de seleção */}
      <Modal isOpen={showMemberModal} fnClose={() => setShowMemberModal(false)}>
        <ListMembers
          members={{ filteredMembers, totalPages }}
          search={{ search, setSearch }}
          onConfirm={selected => {
            setSelectedMembers(selected);
            setMembers(selected);
            setShowMemberModal(false);
          }}
          isLoading={isLoading}
          onClose={() => setShowMemberModal(false)}
        />
      </Modal>
    </div>
  );
}
