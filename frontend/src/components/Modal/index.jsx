import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ButtonUI from '../ui/Button';

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  fnClose,
  autoCloseOnSuccess = true, // 👈 opcional
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();

  // 🔍 Observa mutations do React Query
  useEffect(() => {
    if (!autoCloseOnSuccess || !isOpen) return;

    const unsubscribe = queryClient.getMutationCache().subscribe(mutation => {
      if (mutation?.action?.type === 'success') {
        setIsOpen(false);
      } else if (mutation?.action?.type === 'error') {
        const err = mutation.action.error;
        console.error(err);
      }
    });

    return () => unsubscribe?.();
  }, [autoCloseOnSuccess, isOpen, queryClient]);

  function handleCloseAttempt() {
    setShowConfirm(true);
  }

  function handleConfirmClose() {
    setShowConfirm(false);
    fnClose?.();
  }

  function handleCancelClose() {
    setShowConfirm(false);
  }

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={handleCloseAttempt} className="fixed z-50 inset-0">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-70"
              leave="ease-in duration-200"
              leaveFrom="opacity-70"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-[rgba(31,45,61,0.7)]"
                data-testid="modal-overlay"
              />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel
                className="w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto 
                           rounded-2xl p-6 sm:p-8 relative shadow-lg transition-all font-principal
                           bg-surface text-text"
                data-testid="modal-panel"
              >
                <ButtonUI
                  aria-label="Fechar modal"
                  onClick={handleCloseAttempt}
                  className="text-3xl font-extrabold text-white bg-error 
                w-10 h-10 rounded-lg absolute top-3 right-3 opacity-80 
                hover:opacity-100 transition-opacity cursor-pointer shadow-md flex justify-center"
                >
                  <span>x</span>
                </ButtonUI>

                <div className="p-6 sm:p-8">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
        message="Ops! Fechar agora vai descartar tudo. Tem certeza?"
        confirmLabel="Sim"
        cancelLabel="Não"
      />
    </>
  );
}

export function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  message = 'Você realmente deseja continuar?',
  confirmLabel = 'Sim',
  cancelLabel = 'Não',
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          return;
        }}
        className="fixed z-[60] inset-0"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <DialogPanel
            className="bg-[var(--color-surface)] text-[var(--color-text)]
                       rounded-2xl p-6 shadow-xl text-center max-w-sm w-full"
          >
            <p className="text-sm mb-6 text-text">{message}</p>

            <div className="flex justify-center gap-3">
              <ButtonUI
                onClick={onConfirm}
                className="bg-error text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
              >
                <span>{confirmLabel}</span>
              </ButtonUI>
              <ButtonUI
                onClick={onCancel}
                className="bg-primary text-white  px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                <span>{cancelLabel}</span>
              </ButtonUI>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
