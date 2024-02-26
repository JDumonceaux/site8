import {
  DialogHTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { styled } from 'styled-components';

import styles from './Modal.module.css';

type ModalProps = {
  readonly isOpen: boolean;
  readonly title?: string;
  readonly isLocked?: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
  readonly requiresUserAction?: boolean;
} & DialogHTMLAttributes<HTMLDialogElement>;

const StyledTitleBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: var(--main-background-color, #000);
  color: var(--palette-grey-10, #fff);
  box-shadow: 0 5px 20px -10px #000;
  margin-bottom: 2px;
  & > button {
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
  }
`;

// https://dev.to/link2twenty/react-using-native-dialogs-to-make-a-modal-popup-4b25
// https://www.youtube.com/watch?v=ywtkJkxJsdg
// If the dialog is a confirmation window communicating an important message
// that requires a confirmation or other user response, set role = "alertdialog"
export const Modal = ({
  isOpen,
  title,
  isLocked,
  onClose,
  children,
  requiresUserAction = false,
  ...rest
}: ModalProps): JSX.Element => {
  const modalRef = useRef(null);

  // work out which classes should be applied to the dialog element
  const dialogClasses = useMemo(() => {
    const _arr = [styles['modal']];
    if (!isOpen) _arr.push(styles['modal--closing']);

    return _arr.join(' ');
  }, [isOpen]);

  // Eventlistener: trigger onclose when cancel detected
  const onCancel = useCallback(() => {
    //e.preventDefault();
    if (!isLocked) onClose();
  }, [isLocked, onClose]);

  // Eventlistener: trigger onclose when click outside
  const onClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ target }: any) => {
      const { current: el } = modalRef;
      if (target === el && !isLocked) onClose();
    },
    [isLocked, onClose],
  );

  // Eventlistener: trigger close click on anim end
  const onAnimEnd = useCallback(() => {
    const { current: el }: MutableRefObject<null> = modalRef;
    if (!isOpen && el !== null) {
      (el as HTMLDialogElement).close();
    }
  }, [isOpen]);

  // when isOpen changes run open/close command
  useEffect(() => {
    const { current: el } = modalRef;
    // Show modal
    if (isOpen && el !== null) {
      (el as HTMLDialogElement).showModal();
    }
    // Show non-modal
    // if (isOpen) el.showModal();
  }, [isOpen]);

  // The tabindex attribute must not be used on the <dialog>
  // it is recommended to add autoFocus to the
  // close button inside the dialog, or the dialog itself
  // if the user is expected to click / activate it to dismiss.
  // ?? AutoFocus ??
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      aria-describedby="dialog-desc"
      aria-labelledby="dialog-title"
      aria-modal="true"
      className={dialogClasses}
      onAnimationEnd={onAnimEnd}
      onCancel={onCancel}
      onClick={onClick}
      onClose={onClose}
      ref={modalRef}
      role={requiresUserAction ? 'alertdialog' : 'dialog'}
      {...rest}
      data-testid="dialog">
      <StyledTitleBar>
        <label id="dialog-title">{title}</label>
        <button
          aria-label="close"
          data-close-modal
          id="button"
          onClick={onClose}
          type="button">
          X
        </button>
      </StyledTitleBar>
      <div className={styles['modal--div']} id="dialog-desc">
        {children}
      </div>
    </dialog>
  );
};
