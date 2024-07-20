import { DialogHTMLAttributes, useLayoutEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const { current: el } = modalRef;
    if (isOpen && el !== null) {
      el.showModal();
    }
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

export default DialogSaving;

const StyledElement = styled.dialog`
  all: revert;
  ::backdrop {
    opacity: 0.75;
  }
`;
