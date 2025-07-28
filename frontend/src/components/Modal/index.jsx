import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import ButtonUI from '../ui/Button';

export default function Modal({ children, isOpen, fnClose }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={fnClose} className="fixed z-50 inset-0">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* BACKDROP COM ANIMAÇÃO */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-70"
            leave="ease-in duration-200"
            leaveFrom="opacity-70"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[rgba(31,45,61,0.7)]" />
            {/* Usando cor do --color-text com opacidade */}
          </TransitionChild>

          {/* PAINEL DO MODAL COM ANIMAÇÃO */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <DialogPanel className="w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 relative shadow-lg transition-all font-sans text-color-text">
              <ButtonUI
                title="×"
                fnClick={fnClose}
                className="text-3xl font-extrabold text-white bg-error w-10 h-10 rounded-lg absolute top-3 right-3 opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-md flex justify-center"
                aria-label="Fechar modal"
              />
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
