import { describe, it, expect } from 'vitest';
import { formatBRL } from '../../src/utils/formatters';

describe('formatBRL', () => {
  it('formata 0 como R$\u00A00,00', () => {
    expect(formatBRL(0)).toBe('R$\u00A00,00');
  });

  it('formata positivo com separadores pt-BR', () => {
    expect(formatBRL(1234.56)).toBe('R$\u00A01.234,56');
  });

  it('formata negativo com sinal', () => {
    expect(formatBRL(-10)).toBe('-R$\u00A010,00');
  });

  it('arredonda corretamente valores decimais', () => {
    const value = 0.1 + 0.2; // 0.30000000000000004
    expect(formatBRL(value)).toBe('R$\u00A00,30');
  });
});
