import { DialogHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';

type ModalPortalProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

const ModalPortal = ({ isOpen, onClose, children }: ModalPortalProps) => {
  if (!isOpen) return null;

  const portalDiv = document.getElementById('modal-root') as HTMLElement;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>,
    portalDiv,
  );
};
export default ModalPortal;
