import { useCallback } from 'react';
import useSnackbar from 'services/hooks/useSnackbar';
import { styled } from 'styled-components';

const StyledDialog = styled.dialog`
  position: fixed;
  right: 0;
  margin: unset;
  inset-inline-start: unset;
`;

export const Snackbar = (): JSX.Element => {
  const { snackbarData, closeSnackbar } = useSnackbar();

  const handleOnClose = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  return (
    <StyledDialog
      data-testid="snackbar"
      onClose={handleOnClose}
      open={snackbarData?.isOpen}>
      {snackbarData?.contents}
    </StyledDialog>
  );
};
export default Snackbar;
