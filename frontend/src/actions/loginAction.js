// src/routes/loginAction.js
import { loginUserFormSchema } from '../schemas/loginUser/form';
import { z } from 'zod';

export const loginAction = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const { success, error, data } = loginUserFormSchema.safeParse(formData);
  if (!success) {
    const errors = {};
    if (error instanceof z.ZodError) {
      error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        const title =
          loginUserFormSchema.shape[fieldName]?.description || fieldName;

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
