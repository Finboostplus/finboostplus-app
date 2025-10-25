// src/routes/loginAction.js
import { createGroupFormSchema } from '../schemas/createGroup/form';
import { z } from 'zod';
import { createGroup } from '../services/groups';
import { customToast } from '../components/CustomToast';

export const groupAction = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const { success, error, data } = createGroupFormSchema.safeParse(formData);
  console.log(data);
  if (!success) {
    const errors = {};
    if (error instanceof z.ZodError) {
      error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        const title =
          createGroupFormSchema.shape[fieldName]?.description || fieldName;

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

  try {
    /* await createGroup(data); */
    customToast('Grupo criado', 'Grupo criado com sucesso', 'error');
  } catch (error) {
    customToast('Error', error.message, 'error');
  }
};
