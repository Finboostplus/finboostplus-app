import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../../src/components/ModalButton/Modal';

const renderModal = (props = {}) => {
  const defaultProps = {
    isOpen: true,
    fnClose: vi.fn(),
    children: <div data-testid="modal-content">Conteúdo do Modal</div>,
  };
  const allProps = { ...defaultProps, ...props };
  const utils = render(<Modal {...allProps} />);
  return { ...utils, props: allProps };
};

describe('Modal (HeadlessUI)', () => {
  it('não renderiza quando isOpen=false', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renderiza o conteúdo quando isOpen=true', () => {
    renderModal();
    // Dialog usa role="dialog"
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('fecha ao clicar no botão de fechar', async () => {
    const user = userEvent.setup();
    const { props } = renderModal();

    const closeButton = screen.getByRole('button', { name: /fechar modal/i });
    await user.click(closeButton);

    expect(props.fnClose).toHaveBeenCalled();
  });

  it('fecha ao pressionar ESC', async () => {
    const user = userEvent.setup();
    const { props } = renderModal();

    // Foca no painel do dialog
    const dialog = screen.getByRole('dialog');
    dialog.focus();
    await user.keyboard('{Escape}');

    expect(props.fnClose).toHaveBeenCalled();
  });

  it('fecha ao clicar no backdrop (fora do painel)', () => {
    const { props } = renderModal();

    // Seleciona o overlay via data-testid (adicionado no componente)
    const overlay = screen.getByTestId('modal-overlay');

    fireEvent.mouseDown(overlay);
    fireEvent.mouseUp(overlay);
    fireEvent.click(overlay);

    expect(props.fnClose).toHaveBeenCalled();
  });
});
