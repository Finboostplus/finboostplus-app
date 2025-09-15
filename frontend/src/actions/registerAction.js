// src/routes/registerAction.js
import { registerUserFormSchema } from '../schemas/registerUser/form';
import { z } from 'zod';

export const registerAction = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const { success, error, data } = registerUserFormSchema.safeParse(formData);
  if (!success) {
    const errors = {};
    if (error instanceof z.ZodError) {
      error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        const title =
          registerUserFormSchema.shape[fieldName]?.description || fieldName;

        return (errors[fieldName] = {
          title,
          message: issue.message,
        });
      });
    } else {
      errors.global = 'Ocorreu um erro inesperado.';
    }

    return { success, errors, value: data };
  }
  /* Se não ocorreu nenhum erro */
  console.log(data);
};
