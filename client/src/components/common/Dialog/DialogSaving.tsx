import { DialogHTMLAttributes, memo, useLayoutEffect, useRef } from 'react';
import { styled } from 'styled-components';

type DialogSavingProps = {
  readonly children: React.ReactNode;
  readonly isOpen: boolean;
  readonly role?: 'alertdialog' | 'contentinfo' | 'dialog' | 'none' | 'status';
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'tabindex' | 'role'>;

const DialogSaving = ({
  isOpen,
  children,
  role = 'contentinfo',
  ...rest
}: DialogSavingProps): JSX.Element => {
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    const { current: el } = modalRef;
    // Show modal
    if (isOpen && el !== null) {
      (el as HTMLDialogElement).showModal();
    }
    // Show non-modal
    // if (isOpen) el.modal();
  }, [isOpen]);

  return (
    <StyledElement
      data-testid="DialogSaving"
      ref={modalRef}
      role={role}
      {...rest}>
      {children}
      <form method="dialog">
        <button type="button">Close</button>
      </form>
    </StyledElement>
  );
};

export default memo(DialogSaving);

const StyledElement = styled.dialog`
  all: revert;
  ::backdrop {
    opacity: 0.75;
  }
`;
