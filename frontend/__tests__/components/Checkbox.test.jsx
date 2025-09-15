import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxUI from '../../src/components/ui/Checkbox';
import React from 'react';

// Harness controlado para facilitar teste de toggle
function ControlledCheckbox({ label = 'Aceito os termos', disabled = false, initial = false, onChangeSpy }) {
  const [checked, setChecked] = React.useState(initial);
  const handleChange = (value) => {
    onChangeSpy?.(value);
    setChecked(value);
  };
  return (
    <CheckboxUI id="chk" label={label} checked={checked} onChange={handleChange} disabled={disabled} />
  );
}

describe('CheckboxUI', () => {
  it('renderiza com label e estado inicial', () => {
    render(<ControlledCheckbox label="Receber novidades" initial={false} />);

    const checkbox = screen.getByRole('checkbox', { name: /receber novidades/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('alterna para marcado ao clicar e chama onChange com o novo valor', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(<ControlledCheckbox initial={false} onChangeSpy={spy} />);

    const checkbox = screen.getByRole('checkbox', { name: /aceito os termos/i });
    await user.click(checkbox);

    expect(spy).toHaveBeenCalledWith(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');

    // Clica novamente -> desmarca
    await user.click(checkbox);
    expect(spy).toHaveBeenCalledWith(false);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('não altera quando disabled=true e não chama onChange', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(<ControlledCheckbox initial={false} disabled onChangeSpy={spy} />);

    const checkbox = screen.getByRole('checkbox', { name: /aceito os termos/i });
    // HeadlessUI usa aria-disabled em vez do atributo disabled no node com role=checkbox
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    await user.click(checkbox);

    expect(spy).not.toHaveBeenCalled();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });
});
