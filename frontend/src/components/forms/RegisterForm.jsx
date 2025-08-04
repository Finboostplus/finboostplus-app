import { Menu, MenuItem } from '@headlessui/react';
import { useState } from 'react';
import { Form, useActionData } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import MessageBox from '../MessageBox';
import CheckboxUI from '../ui/Checkbox';

export default function RegisterForm() {
  const [checked, setChecked] = useState(false);
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const values = actionData?.values || {};

  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-surface p-6 rounded-2xl shadow-md border border-neutral transition-colors"
        aria-label="Formulário de cadastro"
      >
        {[
          {
            id: 'full_name',
            label: 'Nome completo',
            type: 'text',
            placeholder: 'Digite seu nome completo',
          },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Digite seu email',
          },
          {
            id: 'password',
            label: 'Senha',
            type: 'password',
            placeholder: 'Digite sua senha',
          },
          {
            id: 'confirm_password',
            label: 'Confirmar senha',
            type: 'password',
            placeholder: 'Confirme sua senha',
          },
        ].map(({ id, label, type, placeholder }) => (
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
              className="w-full h-11 rounded-xl border border-muted px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            {errors[id] && <MessageBox>{errors[id][0]}</MessageBox>}
          </div>
        ))}

        <div className="w-full flex items-start gap-2">
          <CheckboxUI
            checked={checked}
            onChange={setChecked}
            name="terms"
            label="Aceitar os termos de uso e política de privacidade"
          />
        </div>
        {errors.terms && (
          <MessageBox className="-mt-4 w-full text-left">
            {errors.terms[0]}
          </MessageBox>
        )}

        <ButtonUI
          title="Cadastrar"
          type="submit"
          className="w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors"
        />

        <input type="hidden" name="type" value="register" />
      </Form>

      <Menu as={'div'}>
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
