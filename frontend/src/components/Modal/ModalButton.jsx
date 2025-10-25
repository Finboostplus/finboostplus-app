import { useState } from 'react';
import ButtonUI from '../ui/Button';
import Modal from '.';

export default function ModalButton({ modalChildren }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Modal
        fnClose={() => setIsOpenModal(false)}
        children={modalChildren}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />

      <ButtonUI
        type="button"
        onClick={() => setIsOpenModal(true)}
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
      >
        <span>+</span>
      </ButtonUI>
    </>
  );
}
