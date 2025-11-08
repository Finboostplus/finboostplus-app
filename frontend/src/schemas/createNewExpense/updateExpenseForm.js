import { z } from 'zod'; // ✅ precisa ser importado assim (com chaves)

const ExpenseSchema = z.object({
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional(),

  // ✅ Validação e conversão de data
  deadlineDate: z
    .preprocess(
      val => {
        if (!val) return undefined; // permite undefined/null
        return val instanceof Date ? val : new Date(val);
      },
      z
        .date({ invalid_type_error: 'Data inválida' })
        .refine(d => !isNaN(d.getTime()), { message: 'Data inválida' })
    )
    .optional(),

  // ✅ categoryId: pode ser número positivo ou string numérica
  categoryId: z
    .union([
      z
        .string()
        .regex(/^\d+$/, 'categoryId numérico inválido')
        .transform(n => Number(n)),
      z.number().int().positive(),
    ])
    .refine(val => !!val, { message: 'categoryId obrigatório' }),
});

/**
 * Valida e normaliza os dados do formulário.
 * Retorna:
 *  { success: true, data }  → se estiver válido
 *  { success: false, errors } → se houver erros
 */
export function validateExpensePayload(payload) {
  const result = ExpenseSchema.safeParse(payload);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Transforma erros do Zod em um objeto { campo: mensagem }
  const errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path.join('.') || '_form';
    if (!errors[field]) errors[field] = issue.message;
  }

  return { success: false, errors };
}
