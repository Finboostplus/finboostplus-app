import { z, ZodError } from 'zod';
import { customToast } from '../../components/CustomToast';

export const createGroupFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome do grupo deve ter pelo menos 3 caracteres')
    .describe('Nome do grupo'),
  icon: z.string(),
  description: z.string().optional(),
});

export function validatorGroupForm(formData) {
  const { success, error } = createGroupFormSchema.safeParse(formData);
  if (success) return success;

  const errors = {};
  if (error instanceof ZodError) {
    error.issues.forEach(issue => {
      const fieldName = issue.path[0];
      const title =
        createGroupFormSchema.shape[fieldName]?.description || fieldName;
      customToast(title, issue.message, 'error');
    });
  } else {
    errors.global = 'Ocorreu um erro inesperado.';
  }
  return success;
}
