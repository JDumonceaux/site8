import { DialogHTMLAttributes } from 'react';
import { Modal } from '../Modal';

type ModalProcessingProps = {
  isOpen: boolean;
  onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export function ModalProcessing({
  isOpen,
  title = 'Save',
  onClose,
  ...rest
}: ModalProcessingProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isLocked={false}
      title={title}
      {...rest}>
      <p>
        I&apos;m a modal window, I don&apos;t use portals but use the dialog
        element from the platform.
      </p>
    </Modal>
  );
}
