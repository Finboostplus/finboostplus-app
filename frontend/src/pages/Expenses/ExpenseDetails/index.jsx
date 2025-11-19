import { useState, useEffect, useMemo } from 'react';
import { TbPigMoney } from 'react-icons/tb';
import {
  EXPENSE_STATUS,
  STATUS_COLORS,
} from '../../Groups/GroupDetails/statusExpense';
import { Form, useLoaderData, useNavigate, useParams } from 'react-router';
import { formatBRL, formatDateBR } from '../../../utils/formatters';
import InputUI from '../../../components/ui/Input';
import TextareaUI from '../../../components/ui/Textarea';
import ButtonUI from '../../../components/ui/Button';
import SelectUI from '../../../components/ui/Select';
import { useGroupExpenseByIdQuery } from '../../../hooks/ReactQuery/Queries/useGroupExpenseByIdQuery';
import { useAllGroupExpenseCategoriesQuery } from '../../../hooks/ReactQuery/Queries/useAllGroupExpenseCategoriesQuery';
import { useUpdateStatusExpensePartialValueMutation } from '../../../hooks/ReactQuery/Mutations/useUpdateStatusExpensePartialValueMutation';
import { useUpdateGroupExpenseByIdMutation } from '../../../hooks/ReactQuery/Mutations/useUpdateGroupExpenseByIdMutation';
import { useDeleteExpenseByIdMutation } from '../../../hooks/ReactQuery/Mutations/useDeleteExpenseByIdMutation';
import { getCurrentDate } from '../../../utils/helpers';
import { ConfirmModal } from '../../../components/Modal';
import { validateExpensePayload } from '../../../schemas/createNewExpense/updateExpenseForm';
import { customToast } from '../../../components/CustomToast';
import { MdOutlineFactCheck } from 'react-icons/md';
import { NotFoundError } from '../../../utils/errors';
import { usePermissions } from '../../Groups/GroupDetails/usePermissions';
export default function ExpenseDetails() {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { group_id, expense_id } = useParams();
  const loaderData = useLoaderData();
  const authority = loaderData;
  const { canEditExpenses, canChangeStatusExpenses, canDeleteExpenses } =
    usePermissions(authority);
  const {
    data: expense,
    isLoading: isLoadingExpense,
    isError,
  } = useGroupExpenseByIdQuery(group_id, expense_id);

  if (isError) {
    throw new NotFoundError('A despesa solicitada não foi encontrada.');
  }

  const { data: categories } = useAllGroupExpenseCategoriesQuery();
  const { mutateAsync: mutateStatus, isPending: isLoadingStatus } =
    useUpdateStatusExpensePartialValueMutation();
  const { mutateAsync: updateExpense, isPending } =
    useUpdateGroupExpenseByIdMutation();
  const { mutateAsync: deleteExpense, isPending: isDeleting } =
    useDeleteExpenseByIdMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    deadlineDate: '',
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title ?? '',
        description: expense.description ?? '',
        categoryId: expense.categoryId ?? '',
        deadlineDate: expense.deadlineDate ?? '',
      });
    }
  }, [expense]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Verifica se há alterações em relação à despesa original
  const hasChanges = useMemo(() => {
    if (!expense) return false;
    return (
      formData.title.trim() !== '' && // título obrigatório
      (formData.title !== expense.title ||
        formData.description !== (expense.description ?? '') ||
        formData.categoryId !== expense.categoryId ||
        formData.deadlineDate !== expense.deadlineDate)
    );
  }, [formData, expense]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!canEditExpenses || !hasChanges) return;

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        deadlineDate: formData.deadlineDate,
      };
      const validation = validateExpensePayload(data);
      if (!validation.success) {
        Object.entries(validation.errors).forEach(([title, message]) =>
          customToast(title, message, 'error')
        );
        return;
      }
      await updateExpense({ group_id, expense_id, data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatusExpensePartialValue = async member_id => {
    if (!canChangeStatusExpenses) return;
    try {
      await mutateStatus({ group_id, expense_id, member_id });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoadingExpense) return <span>Carregado...</span>;

  const color = STATUS_COLORS[expense?.status] || STATUS_COLORS.DEFAULT;

  return (
    <Form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-10 font-principal py-10"
    >
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-center justify-between gap-6 pb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-md">
            <TbPigMoney className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-text">{expense.title}</h2>
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${color.bg} text-white`}
              >
                {EXPENSE_STATUS[expense.status] || 'DESCONHECIDO'}
              </span>
            </div>
            {expense.memberList?.length > 0 &&
              (() => {
                const totalPago = expense.memberList
                  .filter(m => m.status === 'PAID')
                  .reduce((acc, m) => acc + m.partialValue, 0);
                const total = expense.total || 0;
                const porcentagem = total > 0 ? (totalPago / total) * 100 : 0;
                const allPaid = totalPago >= total;

                return (
                  <div className="flex flex-col gap-1 w-full max-w-[250px]">
                    <div className="flex gap-2 justify-between text-xs font-medium text-muted">
                      <span>
                        {formatBRL(totalPago)} / {formatBRL(total)}
                      </span>
                      <span
                        className={`font-semibold ${allPaid ? 'text-green-500' : 'text-muted'}`}
                      >
                        {allPaid
                          ? 'Pago totalmente ✅'
                          : `${Math.floor(porcentagem)}% pago`}
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${allPaid ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${porcentagem}%` }}
                      />
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>
        <p className="inline-flex gap-1 text-sm text-muted whitespace-nowrap">
          Criado em:{' '}
          <span className="font-medium text-text">
            {formatDateBR(expense.createdAt)}
          </span>
        </p>
      </header>

      {/* Informações */}
      <section className="bg-linear-to-r from-secondary/10 via-background to-secondary/10 border border-border rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-text mb-4">
          Informações da Despesa
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-secondary/10 p-4 rounded-xl">
            <p className="text-sm text-muted font-medium">Grupo</p>
            <p className="text-base font-semibold text-text">
              {expense.groupName}
            </p>
          </div>
          <div className="bg-secondary/10 p-4 rounded-xl">
            <p className="text-sm text-muted font-medium">Total</p>
            <p className="text-base font-semibold text-text">
              {formatBRL(expense.total)}
            </p>
          </div>
          <div className="bg-secondary/10 p-4 rounded-xl sm:col-span-2">
            <p className="text-sm text-muted font-medium">Categoria Atual</p>
            <p className="text-base font-semibold text-text">
              {expense.categoryName}
            </p>
          </div>
        </div>
      </section>

      {/* Campos editáveis */}
      {canEditExpenses && (
        <section className="bg-linear-to-br from-background via-secondary/5 to-background border border-border rounded-2xl p-6 shadow-md transition-all duration-200 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
            ✏️ Editar informações da despesa
          </h3>
          <div className="grid gap-6">
            <InputUI
              label="Título"
              name="title"
              className="bg-surface"
              placeholder="Título da despesa"
              value={formData.title}
              onChange={handleChange}
            />
            <TextareaUI
              label="Descrição"
              name="description"
              placeholder="Descrição da despesa..."
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[100px] rounded-lg border border-border bg-background px-3 py-2 text-text shadow-sm transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-muted resize-none bg-surface"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="deadlineDate"
                  className="text-sm font-semibold text-text flex items-center gap-2"
                >
                  <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md">
                    Prazo Final
                  </span>
                  <span className="text-muted text-xs">
                    (data limite da despesa)
                  </span>
                </label>
                <InputUI
                  id="deadlineDate"
                  type="date"
                  name="deadlineDate"
                  min={getCurrentDate()}
                  value={formData.deadlineDate}
                  onChange={handleChange}
                  className="focus:ring-2 bg-surface focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="flex items-end">
                <SelectUI
                  label="Categoria"
                  name="categoryId"
                  className="cursor-pointer"
                  value={formData.categoryId}
                  onChange={handleChange}
                  options={categories.map(c => ({
                    value: c.id,
                    label: c.name,
                  }))}
                >
                  {categories.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </SelectUI>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <ButtonUI
                type="submit"
                disabled={!hasChanges || isPending}
                title={
                  !hasChanges
                    ? 'Sem alterações ou título vazio'
                    : 'Salvar alterações'
                }
                className="px-6 disabled:bg-muted/70 disabled:scale-none disabled:shadow-none disabled:cursor-not-allowed py-2 cursor-pointer font-semibold rounded-lg shadow-md bg-primary text-white hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95"
              >
                {isPending ? 'Enviando...' : 'Salvar alterações'}
              </ButtonUI>

              {canDeleteExpenses && (
                <ButtonUI
                  type="button"
                  onClick={() => setIsOpenConfirmModal(true)}
                  className="px-6 py-2 font-semibold rounded-lg shadow-md bg-error text-white hover:bg-red-500 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  {isDeleting ? 'Excluindo...' : 'Excluir despesa'}
                </ButtonUI>
              )}

              <ConfirmModal
                isOpen={isOpenConfirmModal}
                onCancel={() => setIsOpenConfirmModal(false)}
                onConfirm={async () => {
                  try {
                    await deleteExpense(
                      { group_id, expense_id },
                      { onSuccess: () => navigate(`/groups/${group_id}`) }
                    );
                  } catch (error) {
                    console.error(error);
                  }
                }}
                cancelLabel="Voltar"
                confirmLabel="Excluir"
                message="Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita."
              />
            </div>
          </div>
        </section>
      )}

      {/* Participantes */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6 pb-2">
          <h3 className="text-xl font-bold text-text dark:text-primary-300">
            👥 Participantes
          </h3>
          <span className="text-sm font-medium text-muted flex items-center gap-2">
            <span>Status da Despesa</span>
            <MdOutlineFactCheck size={20} />
          </span>
        </div>

        <div className="space-y-4">
          {expense.memberList?.map(member => {
            const statusMap = {
              PAID: { label: 'Pago' },
              PENDING: { label: 'Aguardando pagamento' },
              UNPAID: { label: 'Não pago' },
            };
            const currentStatus = statusMap[member.status] || statusMap.UNPAID;

            return (
              <div
                key={member.userId}
                className="flex items-center justify-between bg-secondary/10 transition-all rounded-2xl p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-text">{member.userName}</p>
                  <p className="text-sm text-muted mt-1">
                    {formatBRL(member.partialValue)} —{' '}
                    <span
                      className={`font-medium ${STATUS_COLORS[member.status].text}`}
                    >
                      {currentStatus.label}
                    </span>
                  </p>
                </div>

                <ButtonUI
                  onClick={() =>
                    handleChangeStatusExpensePartialValue(member.userId)
                  }
                  disabled={!canChangeStatusExpenses}
                  className={`flex min-w-[130px] disabled:cursor-none cursor-pointer justify-center items-center gap-2 px-5 py-2 rounded-lg font-medium shadow-sm transition-all text-white ${STATUS_COLORS[member.status].bg}`}
                  type="button"
                >
                  {isLoadingStatus
                    ? 'ALTERANDO...'
                    : EXPENSE_STATUS[member.status]}
                </ButtonUI>
              </div>
            );
          })}
        </div>
      </section>
    </Form>
  );
}
