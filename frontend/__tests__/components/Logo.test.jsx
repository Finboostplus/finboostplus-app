import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LogoImage from '../../src/components/Logo';

describe('Componente LogoImage', () => {
  it('deve renderizar a imagem do logo', () => {
    render(<LogoImage />);
    
    const logoImg = screen.getByAltText('Logo da Finboostplus');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/logo.png');
  });

  it('deve renderizar o slogan corretamente', () => {
    render(<LogoImage />);
    
    const slogan = screen.getByLabelText('Slogan');
    expect(slogan).toBeInTheDocument();
    expect(slogan).toHaveTextContent('Controle seus gastos de forma simples e compartilhada');
  });

  it('deve aplicar className personalizada quando fornecida', () => {
    const customClass = 'custom-logo-class';
    render(<LogoImage className={customClass} />);
    
    const logoImg = screen.getByAltText('Logo da Finboostplus');
    expect(logoImg).toHaveClass(customClass);
  });

  it('deve ter a estrutura HTML correta', () => {
    render(<LogoImage />);
    
    // Verifica se existe um div container
    const container = screen.getByAltText('Logo da Finboostplus').parentElement;
    expect(container.tagName).toBe('DIV');
    
    // Verifica se o parágrafo tem as classes corretas
    const slogan = screen.getByLabelText('Slogan');
    expect(slogan).toHaveClass('text-[0.7rem]', 'ml-4', 'text-muted', 'italic', 'font-principal');
  });
});
