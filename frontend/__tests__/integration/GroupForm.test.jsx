import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import GroupForm from '../../src/components/forms/GroupForm';

// Mock do customToast para capturar mensagens de erro
vi.mock('../../src/components/CustomToast', () => ({
  customToast: vi.fn(),
}));

// Helper para renderizar com router context
const renderWithRouter = (component) => {
  const router = createMemoryRouter(
    [
      { path: '/', element: component, action: vi.fn() },
    ],
    { initialEntries: ['/'] },
  );

  return render(<RouterProvider router={router} />);
};

describe('GroupForm - Testes Unitários', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', () => {
    renderWithRouter(<GroupForm />);

    // Verifica se os elementos principais estão presentes
    expect(screen.getByText('Criar novo grupo')).toBeInTheDocument();
    expect(screen.getByLabelText(/nome do grupo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar grupo/i })).toBeInTheDocument();
  });

  it('deve permitir preenchimento dos campos', async () => {
    const user = userEvent.setup();
    renderWithRouter(<GroupForm />);

    const nameInput = screen.getByLabelText(/nome do grupo/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);

    await user.type(nameInput, 'Grupo Família');
    await user.type(descriptionInput, 'Grupo da família Silva');

    expect(nameInput).toHaveValue('Grupo Família');
    expect(descriptionInput).toHaveValue('Grupo da família Silva');
  });

  it('deve ter os campos obrigatórios marcados', () => {
    renderWithRouter(<GroupForm />);

    const nameInput = screen.getByLabelText(/nome do grupo/i);
    expect(nameInput).toBeRequired();

    const descriptionInput = screen.getByLabelText(/descrição/i);
    expect(descriptionInput).not.toBeRequired();
  });
});
