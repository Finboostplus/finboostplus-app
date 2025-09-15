import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// Exemplo de componente de formulário simples para demonstrar testes
const LoginForm = ({ onSubmit, onError }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      onError?.('Email e senha são obrigatórios');
      return;
    }

    setIsLoading(true);
    
    try {
      await onSubmit({ email, password });
    } catch (error) {
      onError?.(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

describe('Testes de Integração - LoginForm', () => {
  it('deve submeter o formulário com dados válidos', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockResolvedValue();
    const mockError = vi.fn();
    
    render(<LoginForm onSubmit={mockSubmit} onError={mockError} />);
    
    // Preenche os campos
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/senha/i), 'password123');
    
    // Submete o formulário
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    // Verifica se foi chamado com os dados corretos
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(mockError).not.toHaveBeenCalled();
  });

  it('deve mostrar erro quando campos estão vazios', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    const mockError = vi.fn();
    
    render(<LoginForm onSubmit={mockSubmit} onError={mockError} />);
    
    // Submete sem preencher campos
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    expect(mockError).toHaveBeenCalledWith('Email e senha são obrigatórios');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('deve mostrar estado de loading durante submit', async () => {
    const user = userEvent.setup();
    let resolveSubmit;
    const mockSubmit = vi.fn(() => new Promise(resolve => {
      resolveSubmit = resolve;
    }));
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Preenche e submete
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/senha/i), 'password123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    // Verifica estado de loading
    expect(screen.getByText('Entrando...')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
    
    // Resolve a promise
    resolveSubmit();
    
    // Verifica que voltou ao estado normal
    await waitFor(() => {
      expect(screen.getByText('Entrar')).toBeInTheDocument();
    });
  });

  it('deve lidar com erro durante submit', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Credenciais inválidas'));
    const mockError = vi.fn();
    
    render(<LoginForm onSubmit={mockSubmit} onError={mockError} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/senha/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Credenciais inválidas');
    });
  });

  it('deve permitir navegação por teclado', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    // Navega usando Tab
    await user.tab();
    expect(emailInput).toHaveFocus();
    
    await user.tab();
    expect(passwordInput).toHaveFocus();
    
    await user.tab();
    expect(submitButton).toHaveFocus();
  });
});
