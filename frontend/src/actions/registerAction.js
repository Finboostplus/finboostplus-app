import { registerUserFormSchema } from '../schemas/registerUser/form';
import { z } from 'zod';
import { register } from '../services/auth';
import { getavatarBackgroundColorRandom } from '../mockData/colorsPallete/colors';

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
    // Sucesso na validação
    const notification = {
      title: 'Novo cadastro',
      message: 'Usuário cadastrado com sucesso!',
    };
    // Utilizar console.log para debug:
    delete data.terms;
    delete data.confirmPassword;
    data.themeColor = getavatarBackgroundColorRandom();
    const response = await register(data);
    return response;
  }
};
