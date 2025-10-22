// src/routes/loginAction.js
import { loginUserFormSchema } from '../schemas/loginUser/form';
import { z } from 'zod';
import { useAuthStore } from '../context/stores/auth';

export const loginAction = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  let { success, error, data } = loginUserFormSchema.safeParse(formData);
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
  /* Logar aqui */

  const response = await useAuthStore.getState().login(data);
  return response;
};
