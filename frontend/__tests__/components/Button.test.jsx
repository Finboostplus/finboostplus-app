import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonUI from '../../src/components/ui/Button';

describe('Componente ButtonUI', () => {
  it('deve renderizar o botão com título', () => {
    render(<ButtonUI title="Clique aqui" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Clique aqui');
  });

  it('deve chamar a função onClick quando clicado', () => {
    const mockClick = vi.fn();
    render(<ButtonUI title="Botão teste" fnClick={mockClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled=true', () => {
    const mockClick = vi.fn();
    render(<ButtonUI title="Botão desabilitado" fnClick={mockClick} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    // Tenta clicar no botão desabilitado
    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('deve usar ariaLabel personalizado quando fornecido', () => {
    render(<ButtonUI title="Botão" ariaLabel="Botão personalizado" />);
    
    const button = screen.getByLabelText('Botão personalizado');
    expect(button).toBeInTheDocument();
  });

  it('deve usar title como aria-label quando ariaLabel não for fornecido', () => {
    render(<ButtonUI title="Meu botão" />);
    
    const button = screen.getByLabelText('Meu botão');
    expect(button).toBeInTheDocument();
  });

  it('deve aplicar className personalizada', () => {
    const customClass = 'custom-button-class';
    render(<ButtonUI title="Botão" className={customClass} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });

  it('deve renderizar ícone quando fornecido', () => {
    const TestIcon = () => <span data-testid="test-icon">🚀</span>;
    render(<ButtonUI title="Botão com ícone" icon={<TestIcon />} />);
    
    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('🚀');
  });

  it('deve definir o type correto do botão', () => {
    render(<ButtonUI title="Submit" type="submit" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('deve usar type="button" como padrão', () => {
    render(<ButtonUI title="Padrão" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
