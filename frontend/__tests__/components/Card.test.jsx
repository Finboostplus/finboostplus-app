import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardUI from '../../src/components/ui/Card';
import React from 'react';

describe('CardUI', () => {
  it('renderiza children', () => {
    render(
      <CardUI>
        <p>Conteúdo do card</p>
      </CardUI>
    );

    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
  });

  it('aceita className extra', () => {
    render(
      <CardUI className="shadow-lg data-test-extra">
        Extra
      </CardUI>
    );

    // Como o CardUI não tem testid próprio, usamos o próprio elemento com o texto
    const card = screen.getByText('Extra');
    expect(card.className).toMatch(/shadow-lg/);
    expect(card.className).toMatch(/data-test-extra/);
  });
});
