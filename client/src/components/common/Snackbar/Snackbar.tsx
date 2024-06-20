import { IconButton } from 'components/form/IconButton';
import { CloseIcon } from 'components/icons/CloseIcon';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback } from 'react';
import { styled } from 'styled-components';
import { SnackbarVariant } from 'types';

type SnackbarProps = {
  readonly variant?: SnackbarVariant;
};

// Note: Snackbars or Toast Snackbars are not recommended
// https://www.magentaa11y.com/checklist-web/toast-snackbar/
const Snackbar = ({
  variant = SnackbarVariant.INFO,
}: SnackbarProps): JSX.Element | null => {
  const { snackbarData, closeSnackbar } = useSnackbar();

  const handleOnClose = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  if (!snackbarData?.isOpen) {
    return null;
  }

  return (
    <StyledDialog
      $variant={variant}
      data-testid="snackbar"
      onClose={handleOnClose}
      open={snackbarData?.isOpen}>
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

export default Snackbar;

const StyledDialog = styled.dialog<{ $variant: string }>`
  background: var(--snackbar-background);
  color: ${(props) =>
    props.$variant === SnackbarVariant.INFO
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
