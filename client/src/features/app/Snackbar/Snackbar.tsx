import type { JSX } from 'react';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/core/Button/Button';
import useSnackbar, { SnackbarVariant } from './useSnackbar';

const SNACKBAR_HEIGHT = '2.5rem';
const SNACKBAR_PADDING = '1rem';
const SNACKBAR_BORDER_RADIUS = '0.75rem';
const MESSAGE_MARGIN = '1rem';
const MESSAGE_FONT_SIZE = '0.875rem';

/**
 * Global notification banner for transient messages.
 * Displays at the bottom of the viewport with support for different variants.
 */
const Snackbar = (): JSX.Element | null => {
  const { closeSnackbar, data } = useSnackbar();

  const handleClose = useCallback(() => {
    try {
      closeSnackbar();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Error closing snackbar:', errorMessage);
    }
  }, [closeSnackbar]);

  useEffect(() => {
    if (!data?.isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [data?.isOpen, handleClose]);

  if (!data?.isOpen) {
    return null;
  }

  const contents = data.contents ?? '';
  const variant = data.variant ?? SnackbarVariant.INFO;

  return (
    <StyledDialog
      $variant={variant}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      data-testid="snackbar"
      onClose={handleClose}
      open
    >
      <Message>{contents}</Message>
      <CloseButton
        aria-label="Close notification"
        onClick={handleClose}
      >
        ×
      </CloseButton>
    </StyledDialog>
  );
};

Snackbar.displayName = 'Snackbar';
export default Snackbar;

const StyledDialog = styled.dialog<{ readonly $variant: SnackbarVariant }>`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 ${SNACKBAR_PADDING};
  height: ${SNACKBAR_HEIGHT};
  background: var(--snackbar-background);
  color: ${({ $variant }) =>
    $variant === SnackbarVariant.INFO
      ? 'var(--snackbar-color)'
      : 'var(--palette-error)'};
  border-radius: ${SNACKBAR_BORDER_RADIUS} ${SNACKBAR_BORDER_RADIUS} 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border: none;
  margin: 0;

  &::backdrop {
    background: transparent;
  }
`;

const Message = styled.div`
  flex: 1;
  margin-right: ${MESSAGE_MARGIN};
  font-size: ${MESSAGE_FONT_SIZE};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseButton = styled(Button)`
  min-width: auto;
  padding: 0.25rem 0.5rem;
  font-size: 1.5rem;
  line-height: 1;
`;
