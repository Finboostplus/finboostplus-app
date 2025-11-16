import { z, ZodError } from 'zod';
import { customToast } from '../../components/CustomToast';

export const createNewExpenseFormSchema = z.object({
  title: z.string().min(3, 'Título deve ter ao menos 3 caracteres'),
  expenseValue: z
    .number({
      required_error: 'O valor da despesa é obrigatório',
      invalid_type_error: 'Valor inválido',
    })
    .positive('A despesa deve ter um valor maior que zero'),

  categoryId: z
    .number({
      required_error: 'Categoria é obrigatória',
      invalid_type_error: 'Categoria inválida',
    })
    .int()
    .positive(),
  description: z.string().optional(),
  deadlineDate: z.string(), // normalmente vem como string ISO de input date

  expenseDivision: z
    .array(
      z.object({
        id: z.number().int().positive(),
        value: z.number().nonnegative(),
      })
    )
    .min(1, 'A divisão da despesa é obrigatória'),
});

export function validatorCreateNewExpense(formData) {
  const { success, error } = createNewExpenseFormSchema.safeParse(formData);
  if (success) return success;
  const errors = {};
  if (error instanceof ZodError) {
    error.issues.forEach(issue => {
      const fieldName = issue.path[0];
      const title =
        createNewExpenseFormSchema.shape[fieldName]?.description || fieldName;
      customToast(title, issue.message, 'error');
    });
  } else {
    errors.global = 'Ocorreu um erro inesperado.';
  }
  return success;
}
