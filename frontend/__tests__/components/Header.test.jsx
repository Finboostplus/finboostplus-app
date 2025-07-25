import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../../src/components/layout/Header';
describe('Componente Header', () => {
  it('deve ter a palavra "Header"', () => {
    render(<Header />);
    console.log('Resultado', screen.getByText('Header').textContent);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
