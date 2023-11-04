import cn from '@/lib/cn';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { Fragment } from 'react';

type TModalProps = {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

const Modal = ({
  isOpen,
  title,
  children,
  className,
  onClose,
}: TModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center pt-20 text-center md:p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={cn(
                  'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                  className
                )}
              >
                <div className='flex items-center justify-between p-1 md:-mx-1'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-semibold leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>

                  <button
                    className='rounded border border-transparent p-2 outline-none transition hover:bg-gray-900'
                    onClick={onClose}
                  >
                    <XIcon className='text-gray-400' />
                  </button>
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
