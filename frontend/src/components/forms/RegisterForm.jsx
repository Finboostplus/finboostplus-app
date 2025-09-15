import { Menu, MenuItem } from '@headlessui/react';
import { useEffect } from 'react';
import { Form, useActionData } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import CheckboxUI from '../ui/Checkbox';
import { customToast } from '../CustomToast';
export default function RegisterForm() {
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const values = actionData?.values || {};

  // Mostra os erros via toast
  useEffect(() => {
    if (actionData?.errors) {
      console.log(errors);
      Object.values(actionData.errors).forEach(({ title, message }) => {
        customToast(title, message, 'error');
      });
    }
  }, [actionData]);

  //Senhas não coincidem

  const fields = [
    {
      id: 'fullName',
      name: 'fullName',
      label: 'Nome completo',
      type: 'text',
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
    },
    {
      id: 'password',
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      label: 'Confirmar senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
    },
  ];

  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-surface p-6 rounded-2xl shadow-md border border-neutral transition-colors"
        aria-label="Formulário de cadastro"
      >
        {fields.map(({ id, label, type, placeholder }) => (
          <div key={id} className="w-full flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-text">
              {label}
            </label>
            <InputUI
              id={id}
              name={id}
              type={type}
              required
              defaultValue={values[id] || ''}
              placeholder={placeholder}
              className={`w-full h-11 rounded-xl border px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition ${
                errors[id] ? 'border-error' : 'border-muted'
              }`}
            />
          </div>
        ))}

        <div className="w-full flex items-start gap-2">
          <CheckboxUI
            type="checkbox"
            id="terms"
            name="terms"
            defaultChecked={values.terms || false}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="terms" className="text-sm text-text">
            Aceitar os termos de uso e política de privacidade
          </label>
        </div>

        <ButtonUI
          title="Cadastrar"
          type="submit"
          className="w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors"
        />
      </Form>

      <Menu as="div">
        <p className="mt-6 text-sm text-text text-center">
          Já tem uma conta?{' '}
          <MenuItem>
            <a
              href="/login"
              className="text-primary hover:underline font-semibold"
              aria-label="Voltar para a tela de login"
            >
              Faça login
            </a>
          </MenuItem>
        </p>
      </Menu>
    </section>
  );
}
