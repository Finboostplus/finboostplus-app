import { registerUserFormSchema } from '../schemas/registerUser/form';
import { z } from 'zod';

import { getavatarBackgroundColorRandom } from '../mockData/colorsPallete/colors';
import { useAuthStore } from '../context/store/auth';

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
  } else {
    /* Deu tudo certo com a validação */
    delete data.terms;
    delete data.confirmPassword;
    data.themeColor = getavatarBackgroundColorRandom();
    const response = await useAuthStore.getState().register(data);
    return response;
  }
};
