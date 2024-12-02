import { memo, useCallback } from 'react';

import { IconButton } from 'components/form/IconButton/IconButton';
import { CloseIcon } from 'components/icons/CloseIcon';
import useSnackbar, { SnackbarVariant } from 'hooks/useSnackbar';
import { styled } from 'styled-components';

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
 * @returns {React.JSX.Element | null} The rendered Snackbar component.
 */
const Snackbar = ({
  variant = SnackbarVariant.INFO,
}: SnackbarProps): null | React.JSX.Element => {
  const { closeSnackbar, data } = useSnackbar();

  const handleOnClose = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  if (!data?.isOpen) {
    return null;
  }

  return (
    <StyledDialog
      data-testid="snackbar"
      onClose={handleOnClose}
      open
      variant={variant}>
      <div>{data.contents}xxxxx</div>
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

const StyledDialog = styled.dialog<{ variant: SnackbarVariant }>`
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
  //right: 0;
  //bottom: ;
  top: 100px;
`;
