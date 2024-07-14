import { DialogHTMLAttributes, memo, useLayoutEffect, useRef } from 'react';
import { styled } from 'styled-components';

type DialogSavingProps = {
  readonly children: React.ReactNode;
  readonly isOpen: boolean;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open'>;

const DialogSaving = ({
  isOpen,
  children,
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
    // if (isOpen) el.showModal();
  }, [isOpen]);

  return (
    <StyledElement
      data-testid="DialogSaving"
      ref={modalRef}
      role="contentinfo"
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
  min-height: 20px;
  background-color: var(--palette-main-color, #000);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  :: backdrop {
    opacity: 0.75;
  }
`;
