import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import GroupForm from '../../src/components/forms/GroupForm';

// Mock do customToast
vi.mock('../../src/components/CustomToast', () => ({
  customToast: vi.fn(),
}));
import { customToast } from '../../src/components/CustomToast';

// Mock dos hooks e do Form do react-router usados no componente
vi.mock('react-router', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    Form: ({ children, ...props }) => <form {...props}>{children}</form>,
    useNavigation: vi.fn(() => ({ state: 'idle' })),
    useActionData: vi.fn(() => null),
  };
});
import { useNavigation, useActionData } from 'react-router';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GroupForm (componente)', () => {
  it('mostra toasts de validação quando actionData contém errors', () => {
    const errors = {
      name: {
        title: 'Nome do grupo',
        message: 'O nome do grupo deve ter pelo menos 3 caracteres',
      },
    };

    // Mocka useActionData para simular retorno da action com erros
    useActionData.mockReturnValue({ errors, values: { name: 'ab' } });

    render(<GroupForm />);

    expect(customToast).toHaveBeenCalledWith(
      errors.name.title,
      errors.name.message,
      'error'
    );
  });

  it('desabilita o botão e altera o título para "Criando..." quando está submetendo', () => {
    // Mocka estado de submissão
    useNavigation.mockReturnValue({ state: 'submitting' });

    render(<GroupForm />);

    // Botão com label acessível igual ao title do ButtonUI
    const btn = screen.getByRole('button', { name: /criando\.{3}|criando\.+|criando/i });
    expect(btn).toBeDisabled();
  });
});
