import type { JSX } from 'react';
import { useCallback, useEffect } from 'react';

import Button from '@components/ui/button/Button';
import { logError } from '@lib/utils/errorHandler';
import useSnackbar, { SnackbarVariants } from './useSnackbar';
import type { SnackbarVariant } from './useSnackbar';
import styled from 'styled-components';

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
      logError(error, { action: 'close', componentName: 'Snackbar' });
    }
  }, [closeSnackbar]);

  useEffect((): (() => void) | undefined => {
    if (data?.isOpen === true) {
      const handleEscapeEvent = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };
      globalThis.addEventListener('keydown', handleEscapeEvent);
      return () => {
        globalThis.removeEventListener('keydown', handleEscapeEvent);
      };
    }

    return undefined;
  }, [data?.isOpen, handleClose]);

  if (data?.isOpen !== true) {
    return null;
  }

  const contents = data.contents ?? '';
  const variant = data.variant ?? SnackbarVariants.INFO;

  return (
    <StyledDialog
      $variant={variant}
      aria-atomic="true"
      aria-live="polite"
      data-testid="snackbar"
      onClose={handleClose}
      open
      role="alert"
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
    $variant === SnackbarVariants.INFO
      ? 'var(--snackbar-color)'
      : 'var(--palette-error)'};
  border-radius: ${SNACKBAR_BORDER_RADIUS} ${SNACKBAR_BORDER_RADIUS} 0 0;
  box-shadow: var(--shadow-elevated);
  z-index: 1000;
  border: none;
  margin: 0;

  &::backdrop {
    background: transparent;
  }
`;

const Message = styled.div`
  flex: 1;
  margin-inline-end: ${MESSAGE_MARGIN};
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
