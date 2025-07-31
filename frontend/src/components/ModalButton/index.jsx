import { useState } from 'react';
import Modal from './Modal';
import ButtonUI from '../ui/Button';

/**
 * Componente de botão flutuante que abre um modal ao ser clicado.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {React.ReactNode} props.modalChildren - Conteúdo que será exibido dentro do modal.
 *
 * @returns {JSX.Element} O botão e o modal que ele controla.
 */
export default function ModalButton({ modalChildren }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Modal
        fnClose={() => setIsOpenModal(false)}
        children={modalChildren}
        isOpen={isOpenModal}
      />
      <ButtonUI
        type="button"
        fnClick={() => setIsOpenModal(true)}
        className="
    fixed 
    bottom-5 right-6
    w-12 h-12
    rounded-full
    bg-primary
    text-white
    text-3xl
    font-extrabold
    flex items-center justify-center
    leading-none
    opacity-60 hover:opacity-100
    shadow-lg
    transition-opacity
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-60
  "
        title="+"
      />
    </>
  );
}
