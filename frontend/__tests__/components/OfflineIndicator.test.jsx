import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OfflineIndicator from '../../src/components/OfflineIndicator';

// Helper para setar navigator.onLine, que é readonly por padrão
const setNavigatorOnline = (value) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value,
  });
};

beforeEach(() => {
  // Padrão: online antes de cada teste
  setNavigatorOnline(true);
});

afterEach(() => {
  // Reset para evitar vazamento entre testes
  setNavigatorOnline(true);
});

describe('OfflineIndicator', () => {
  it('não renderiza quando está online', () => {
    setNavigatorOnline(true);

    render(<OfflineIndicator />);

    expect(screen.queryByText(/offline/i)).toBeNull();
  });

  it('renderiza o indicador quando está offline (estado inicial)', () => {
    setNavigatorOnline(false);

    render(<OfflineIndicator />);

    expect(
      screen.getByText(/você está offline|offline/i)
    ).toBeInTheDocument();
  });

  it('reage aos eventos: aparece ao ficar offline e desaparece ao voltar online', () => {
    setNavigatorOnline(true);

    render(<OfflineIndicator />);

    // Inicialmente online: não exibe
    expect(screen.queryByText(/offline/i)).toBeNull();

    // Fica offline -> deve exibir
    setNavigatorOnline(false);
    fireEvent(window, new Event('offline'));
    expect(screen.getByText(/offline/i)).toBeInTheDocument();

    // Volta online -> deve esconder
    setNavigatorOnline(true);
    fireEvent(window, new Event('online'));
    expect(screen.queryByText(/offline/i)).toBeNull();
  });
});
