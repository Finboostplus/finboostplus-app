import { useState } from 'react';
import ButtonUI from '../../../../components/ui/Button';
import Modal from '../../../../components/Modal';

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
        type={'button'}
        fnClick={() => setIsOpenModal(true)}
        className="fixed bg-blue-600 bottom-5 right-10 w-[50px] h-[50px] rounded-full text-2xl font-bold text-white opacity-45 hover:opacity-100 transition-opacity cursor-pointer"
        title={'+'}
      />
    </>
  );
}
