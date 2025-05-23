import { type JSX, memo } from 'react';

import useSnackbar, { SnackbarVariant } from 'features/app/useSnackbar';

import styled from 'styled-components';

import Button from '../Button/Button';

/**
 * Global notification banner for transient messages.
 */
function Snackbar(): JSX.Element | null {
  const { closeSnackbar, data } = useSnackbar();
  if (!data?.isOpen) return null;

  const { contents = '', variant = SnackbarVariant.INFO } = data;

  return (
    <StyledDialog
      $variant={variant}
      role="alert"
      aria-live="polite"
      data-testid="snackbar"
      onClose={closeSnackbar}
      open>
      <Message>{contents}</Message>
      <Button aria-label="Close notification" onClick={closeSnackbar}>
        ×
      </Button>
    </StyledDialog>
  );
}

Snackbar.displayName = 'Snackbar';
export default memo(Snackbar);

const StyledDialog = styled.dialog<{ $variant: SnackbarVariant }>`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 2.5rem;
  background: var(--snackbar-background);
  color: ${({ $variant }) =>
    $variant === SnackbarVariant.INFO
      ? 'var(--snackbar-color)'
      : 'var(--palette-error)'};
  border-radius: 0.75rem 0.75rem 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  /* ensure the native dialog backdrop is transparent */
  ::backdrop {
    background: transparent;
  }
`;

const Message = styled.div`
  flex: 1;
  margin-right: 1rem;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
