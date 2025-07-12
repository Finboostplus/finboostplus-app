import { Checkbox, Input } from '@headlessui/react';
import { useState } from 'react';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';

export default function RegisterForm() {
  const [checked, setChecked] = useState(false);
  return (
    <form
      className="w-full flex flex-col items-center gap-4"
      onSubmit={e => {
        e.preventDefault();
      }}
      aria-label="Formulário de cadastro"
    >
      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor="full_name"
          className="text-sm font-medium text-gray-700"
        >
          Nome completo
        </label>
        <InputUI
          id="full_name"
          name="full_name"
          type="text"
          placeholder="Digite seu nome completo"
          className="w-full h-10 rounded-[10px] border-2 border-gray-400 px-3"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <InputUI
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu email"
          className="w-full h-10 rounded-[10px] border-2 border-gray-400 px-3"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha
        </label>
        <InputUI
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          className="w-full h-10 rounded-[10px] border-2 border-gray-400 px-3"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor="confirm_password"
          className="text-sm font-medium text-gray-700"
        >
          Confirmar senha
        </label>
        <InputUI
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Confirme sua senha"
          className="w-full h-10 rounded-[10px] border-2 border-gray-400 px-3"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          htmlFor="terms"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Checkbox
            id="terms"
            checked={checked}
            onChange={setChecked}
            className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
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
          <span className="text-sm text-gray-700">
            Aceitar os termos de uso e política de privacidade
          </span>
        </label>
      </div>
      <ButtonUI
        title={'Cadastrar'}
        type="submit"
        className="mt-2 w-full cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      />
    </form>
  );
}
