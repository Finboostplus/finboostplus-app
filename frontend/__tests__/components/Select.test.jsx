import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectUI from '../../src/components/ui/Select';

describe('SelectUI', () => {
  const options = [
    { value: '', label: 'Selecione' },
    { value: 'a', label: 'Opção A' },
    { value: 'b', label: 'Opção B' },
  ];

  it('renderiza opções e respeita defaultValue', () => {
    render(<SelectUI name="teste" options={options} defaultValue="b" required />);

    const select = screen.getByRole('combobox');
    const allOptions = screen.getAllByRole('option');

    expect(allOptions).toHaveLength(3);
    expect(allOptions.map(o => o.textContent)).toEqual(['Selecione', 'Opção A', 'Opção B']);

    // Default selecionado
    expect(select).toHaveValue('b');
    expect(screen.getByRole('option', { name: 'Opção B' }).selected).toBe(true);

    // Possui atributo required
    expect(select).toBeRequired();
  });

  it('dispara onChange e atualiza o valor selecionado', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SelectUI name="teste" options={options} defaultValue="a" onChange={handleChange} />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('a');

    await user.selectOptions(select, 'b');

    // handler chamado e valor alterado visualmente
    expect(handleChange).toHaveBeenCalled();
    expect(select).toHaveValue('b');
    expect(screen.getByRole('option', { name: 'Opção B' }).selected).toBe(true);
  });
});
