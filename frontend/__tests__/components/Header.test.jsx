import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../../src/components/Layout/Header';

describe('Componente Header', () => {
  it('deve renderizar o header corretamente', () => {
    render(<Header />);
    
    // Verifica se o header está presente
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Verifica se o logo está presente
    const logo = screen.getByAltText('Logo da Finboostplus');
    expect(logo).toBeInTheDocument();
    
    // Verifica se o slogan está presente
    const slogan = screen.getByLabelText('Slogan');
    expect(slogan).toBeInTheDocument();
    expect(slogan).toHaveTextContent('Controle seus gastos de forma simples e compartilhada');
  });
});
