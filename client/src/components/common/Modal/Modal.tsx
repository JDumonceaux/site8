import {
  DialogHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { styled } from 'styled-components';

import styles from './Modal.module.css';
import { Button } from 'components/ui/Button';

type ModalProps = {
  readonly open: boolean;
  readonly title?: string;
  readonly locked?: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
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

// eslint-disable-next-line react/prop-types
export function Modal({
  open,
  title,
  locked,
  onClose,
  children,
  ...rest
}: ModalProps): JSX.Element {
  const modalRef = useRef(null);

  // work out which classes should be applied to the dialog element
  const dialogClasses = useMemo(() => {
    const _arr = [styles['modal']];
    if (!open) _arr.push(styles['modal--closing']);

    return _arr.join(' ');
  }, [open]);

  // Eventlistener: trigger onclose when cancel detected
  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      if (!locked) onClose();
    },
    [locked, onClose],
  );

  // Eventlistener: trigger onclose when click outside
  const onClick = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el && !locked) onClose();
    },
    [locked, onClose],
  );

  // Eventlistener: trigger close click on anim end
  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open) el.close();
  }, [open]);

  // when open changes run open/close command
  useEffect(() => {
    const { current: el } = modalRef;
    // Show modal
    if (open) el.showModal();
    // Show non-modal
    // if (open) el.showModal();
  }, [open]);

  // The tabindex attribute must not be used on the <dialog>
  // it is recommended to add autofocus to the
  // close button inside the dialog, or the dialog itself
  // if the user is expected to click / activate it to dismiss.
  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
      {...rest}
      data-testid="dialog">
      <StyledTitleBar>
        {title}
        <button
          id="button"
          onClick={onClose}
          aria-label="close"
          data-close-modal
          autoFocus>
          X
        </button>
      </StyledTitleBar>

      <div className={styles['modal--div']}>{children}</div>
    </dialog>
  );
}
