import { FC, Fragment, ReactNode } from 'react';
import { useModalStore } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
export type ModalProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  isInfoModal?: boolean;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

/**
 * A reusable modal component using Headless UI.
 *
 * @param {ModalProps} props - The props for the dialog component.
 * @returns {JSX.Element} - The dialog component.
 */
export const Modal: FC<ModalProps> = ({
  id,
  title,
  confirmText,
  className,
  description,
  isInfoModal = false,
  children,
  cancelText,
  onConfirm,
}) => {
  const isOpen = useModalStore((state) => state.modals[id] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleConfirm = () => {
    onConfirm && onConfirm();
    closeModal(id);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={'relative z-10'}
          open={isOpen}
          onClose={() => closeModal(id)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-[rgba(0,0,0,0.5)] backdrop-blur-lg rounded-lg p-6 text-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium tracking-wide leading-6 "
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                  {isInfoModal && <p>{description}</p>}
                  {isInfoModal && (
                    <div className="mt-4">
                      <button onClick={handleConfirm}>{confirmText}</button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => closeModal(id)}
                      >
                        {cancelText}
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
