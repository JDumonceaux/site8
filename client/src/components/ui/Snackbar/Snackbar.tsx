import { IconButton } from 'components/form/IconButton';
import { CloseIcon } from 'components/icons/CloseIcon';
import useSnackbar from 'hooks/useSnackbar';
import { memo, useCallback } from 'react';
import { styled } from 'styled-components';
import { SnackbarVariant } from 'types';

// Note: Snackbars or Toast Snackbars are not recommended
// https://www.magentaa11y.com/checklist-web/toast-snackbar/
type SnackbarProps = {
  readonly variant?: SnackbarVariant;
};

/**
 * Snackbar component displays a notification message to the user.
 *
 * @param {Object} props - The component props.
 * @param {SnackbarVariant} props.variant - The variant of the snackbar. Defaults to SnackbarVariant.INFO.
 * @returns {JSX.Element | null} The rendered Snackbar component.
 */
const Snackbar = ({
  variant = SnackbarVariant.INFO,
}: SnackbarProps): JSX.Element | null => {
  const { closeSnackbar, snackbarData } = useSnackbar();

  const handleOnClose = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  if (!snackbarData?.isOpen) {
    return null;
  }

  return (
    <StyledDialog
      data-testid="snackbar"
      onClose={handleOnClose}
      open={snackbarData?.isOpen}
      variant={variant}>
      <div>{snackbarData?.contents}</div>
      <IconButton aria-label="close" onClick={handleOnClose}>
        <CloseIcon ariaHidden focusable={false} />
      </IconButton>
      <div>
        <button onClick={handleOnClose} type="button">
          X
        </button>
      </div>
    </StyledDialog>
  );
};

export default memo(Snackbar);

const StyledDialog = styled.dialog<{ variant: string }>`
  background: var(--snackbar-background);
  color: ${(props) =>
    props.variant === SnackbarVariant.INFO
      ? `var(--snackbar-color)`
      : `var(--palette-error)`};
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  radius: 12px;
  padding: 0 20px;
  position: fixed;
  right: 0;
  bottom: 0;
`;
