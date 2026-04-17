import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mocka os gráficos para evitar dependência do Recharts/ResponsiveContainer
vi.mock('../../src/components/ChartSwitcher/BalanceChart', () => ({
  default: () => <div data-testid="balance-chart">Balance Chart</div>,
}));
vi.mock('../../src/components/ChartSwitcher/ExpenseChart', () => ({
  default: () => <div data-testid="expense-chart">Expense Chart</div>,
}));

import ChartSwitcher from '../../src/components/ChartSwitcher';

describe('ChartSwitcher', () => {
  it('renderiza com o BalanceChart por padrão e mostra label "Gastos Mensais"', () => {
    render(<ChartSwitcher />);

    expect(screen.getByText('Visualização Financeira')).toBeInTheDocument();
    expect(screen.getByTestId('balance-chart')).toBeInTheDocument();
    expect(screen.queryByTestId('expense-chart')).toBeNull();

    // Label do botão quando balance está ativo
    expect(screen.getByRole('button', { name: /gastos mensais/i })).toBeInTheDocument();
  });

  it('alterna para ExpenseChart ao clicar e muda o rótulo para "Saldo Geral"', async () => {
    const user = userEvent.setup();
    render(<ChartSwitcher />);

    const toggleBtn = screen.getByRole('button', { name: /gastos mensais/i });
    await user.click(toggleBtn);

    expect(screen.getByTestId('expense-chart')).toBeInTheDocument();
    expect(screen.queryByTestId('balance-chart')).toBeNull();
    expect(screen.getByRole('button', { name: /saldo geral/i })).toBeInTheDocument();
  });

  it('alterna de volta para BalanceChart ao clicar novamente', async () => {
    const user = userEvent.setup();
    render(<ChartSwitcher />);

    // Primeiro clique -> expense
    await user.click(screen.getByRole('button', { name: /gastos mensais/i }));
    expect(screen.getByTestId('expense-chart')).toBeInTheDocument();

    // Segundo clique -> balance
    await user.click(screen.getByRole('button', { name: /saldo geral/i }));
    expect(screen.getByTestId('balance-chart')).toBeInTheDocument();
    expect(screen.queryByTestId('expense-chart')).toBeNull();
  });

  it('exibe estado vazio quando isEmpty=true e desabilita o botão de alternância', async () => {
    const user = userEvent.setup();
    render(<ChartSwitcher isEmpty emptyMessage="Sem dados disponíveis" />);

    // Mensagem de empty state e testid
    expect(screen.getByTestId('empty-state')).toHaveTextContent('Sem dados disponíveis');

    // Nenhum chart visível
    expect(screen.queryByTestId('balance-chart')).toBeNull();
    expect(screen.queryByTestId('expense-chart')).toBeNull();

    // Botão desabilitado e não alterna
    const toggleBtn = screen.getByRole('button');
    expect(toggleBtn).toBeDisabled();
    await user.click(toggleBtn);
    // Continua mostrando empty
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
