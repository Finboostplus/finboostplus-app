import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate, useLocation } from 'react-router';
import ProtectedRoute from '../../src/routes/ProtectedRoute';

// Confere se o pathname de origem foi preservado
function ShowFrom() {
  const location = useLocation();
  return (
    <div>
      <div data-testid="pathname">{location?.state?.from?.pathname ?? 'no-from'}</div>
    </div>
  );
}

// Testa a rota alvo /login usando MemoryRouter e podemos controlar as entradas iniciais
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<ShowFrom />} />
      <Route element={<ProtectedRoute />}> 
        <Route path="/dashboard" element={<div>Dashboard Private</div>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

// Mantém localStorage limpo entre os testes
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('ProtectedRoute', () => {
  it('redireciona usuários não autenticados para /login', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard' }]}> 
        <AppRoutes />
      </MemoryRouter>
    );

    // Como a rota alvo é protegida e não há token, caímos em /login
    // e o componente ShowFrom renderiza o pathname origem
    expect(screen.getByTestId('pathname')).toHaveTextContent('/dashboard');
  });

  it('renderiza children quando autenticado', () => {
    localStorage.setItem('token', 'fake-token');

    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard' }]}> 
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard Private')).toBeInTheDocument();
  });

  it('preserva a rota de origem em location.state.from quando redireciona', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/dashboard', search: '?q=1#hash' }]}> 
        <AppRoutes />
      </MemoryRouter>
    );

    const fromPath = screen.getByTestId('pathname');
    expect(fromPath).toHaveTextContent('/dashboard');
  });
});
