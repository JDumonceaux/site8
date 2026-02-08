import type { JSX } from 'react';
import { useEffect } from 'react';

import styled, { keyframes } from 'styled-components';

export type SlideoutDialogProps = {
  /** Apply button text */
  applyText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Main body content */
  children: React.ReactNode;
  /** Controls whether the dialog is open */
  isOpen: boolean;
  /** Called when Apply button is clicked */
  onApply: () => void;
  /** Called when the dialog should close */
  onClose: () => void;
  /** Dialog title */
  title?: string;
};

/**
 * A generic slideout dialog that animates from the right side of the screen.
 * Full height with title, content area, and action buttons.
 */
const SlideoutDialog = ({
  applyText = 'Apply',
  cancelText = 'Cancel',
  children,
  isOpen,
  onApply,
  onClose,
  title = 'Settings',
}: SlideoutDialogProps): JSX.Element | null => {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    const cleanup = (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    return cleanup;
  }, [isOpen, onClose]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const cleanup = (): void => {
      document.body.style.overflow = '';
    };

    return cleanup;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (): void => {
    onClose();
  };

  return (
    <>
      <Overlay
        $isClosing={false}
        onClick={handleOverlayClick}
      />
      {/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role */}
      <DialogContainer
        $isClosing={false}
        aria-label={title}
        aria-modal="true"
        onClick={(event): void => {
          event.stopPropagation();
        }}
        role="dialog"
      >
        <Header>
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
        <Footer>
          <CancelButton
            onClick={onClose}
            type="button"
          >
            {cancelText}
          </CancelButton>
          <ApplyButton
            onClick={onApply}
            type="button"
          >
            {applyText}
          </ApplyButton>
        </Footer>
      </DialogContainer>
    </>
  );
};

export default SlideoutDialog;

/* -- Styled Components -- */

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Overlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation-name: ${(props) => (props.$isClosing ? fadeOut : fadeIn)};
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
`;

const DialogContainer = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(400px, 90vw);
  background: var(--surface-background-color, #ffffff);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  animation-name: ${(props) => (props.$isClosing ? slideOut : slideIn)};
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-light, #e0e0e0);
  flex-shrink: 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold, 600);
  color: var(--text-primary-color, #1f1f1f);
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid var(--border-light, #e0e0e0);
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const Button = styled.button`
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: var(--border-radius-md, 6px);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium, 500);
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: 2px solid var(--focus-color, #0052ff);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CancelButton = styled(Button)`
  background: var(--surface-background-color, #f5f5f5);
  color: var(--text-primary-color, #1f1f1f);
  border: 1px solid var(--border-light, #e0e0e0);

  &:hover:not(:disabled) {
    background: var(--border-light, #e0e0e0);
  }
`;

const ApplyButton = styled(Button)`
  background: var(--primary-color, #0052ff);
  color: #ffffff;

  &:hover:not(:disabled) {
    background: var(--primary-hover-color, #0041cc);
  }
`;
