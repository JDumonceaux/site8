import { DialogHTMLAttributes } from 'react';
import { Modal } from '../Modal';

type ModalProcessingProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const ModalProcessing = ({
  isOpen,
  title = 'Save',
  onClose,
  ...rest
}: ModalProcessingProps): JSX.Element => {
  return (
    <Modal
      isLocked={false}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      {...rest}>
      <p>
        I&apos;m a modal window, I don&apos;t use portals but use the dialog
        element from the platform.
      </p>
    </Modal>
  );
};
