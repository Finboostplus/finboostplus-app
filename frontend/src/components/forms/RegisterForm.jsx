import { Checkbox, Menu, MenuItem } from '@headlessui/react';
import { useState } from 'react';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import { Form } from 'react-router';

export default function RegisterForm() {
  const [checked, setChecked] = useState(false);
  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
        aria-label="Formulário de cadastro"
      >
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="full_name" className="text-sm font-medium text-text">
            Nome completo
          </label>
          <InputUI
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Digite seu nome completo"
            required
            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <InputUI
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-text">
            Senha
          </label>
          <InputUI
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            required
            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="confirm_password"
            className="text-sm font-medium text-text"
          >
            Confirmar senha
          </label>
          <InputUI
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Confirme sua senha"
            required
            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="w-full flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={checked}
            onChange={setChecked}
            className="group block size-5 rounded border border-gray-300 bg-white data-checked:bg-primary"
            aria-checked={checked}
            role="checkbox"
          >
            <svg
              className="stroke-white opacity-0 group-data-checked:opacity-100"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
          <label
            htmlFor="terms"
            className="text-sm text-text cursor-pointer select-none"
          >
            Aceitar os termos de uso e política de privacidade
          </label>
        </div>

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
