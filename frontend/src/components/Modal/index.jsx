import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import ButtonUI from '../ui/Button';
import { useActionData, useRevalidator } from 'react-router';
import { customToast } from '../CustomToast';

export default function Modal({ children, isOpen, setIsOpen, fnClose }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const actionData = useActionData();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (actionData?.errors) {
      const nameField = actionData.errors?.name;
      customToast(nameField.title, nameField.message, 'error');
    } else if (actionData?.success) {
      const { data: notification } = actionData;
      customToast(notification.title, notification.message, 'success');
      setIsOpen(false);
    }
    revalidator.revalidate();
  }, [actionData]);

  // 🚫 não fecha o modal direto — só abre o de confirmação
  function handleCloseAttempt() {
    setShowConfirm(true);
  }

  // ✅ agora sim, fecha de fato
  function handleConfirmClose() {
    setShowConfirm(false);
    fnClose(); // fecha o modal principal
  }

  function handleCancelClose() {
    setShowConfirm(false);
  }

  return (
    <>
      {/* Modal principal */}
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
                           rounded-2xl p-6 sm:p-8 relative shadow-lg transition-all font-[var(--font-principal)]
                           bg-[var(--color-surface)] text-[var(--color-text)]"
                data-testid="modal-panel"
              >
                <ButtonUI
                  title="×"
                  fnClick={handleCloseAttempt}
                  className="text-3xl font-extrabold text-white bg-[var(--color-error)] 
                             w-10 h-10 rounded-lg absolute top-3 right-3 opacity-80 
                             hover:opacity-100 transition-opacity cursor-pointer shadow-md flex justify-center"
                  ariaLabel="Fechar modal"
                />
                <div className="p-6 sm:p-8">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Modal de confirmação reutilizável */}
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
            <p className="text-lg mb-6 text-text">{message}</p>

            <div className="flex justify-center gap-3">
              <ButtonUI
                title={confirmLabel}
                fnClick={onConfirm}
                className="bg-error text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
              />
              <ButtonUI
                title={cancelLabel}
                fnClick={onCancel}
                className="bg-primary text-white  px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
