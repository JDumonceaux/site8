import { useCallback } from 'react';
import useSnackbar from 'services/hooks/useSnackbar';
import { styled } from 'styled-components';

const StyledDialog = styled.dialog`
  position: fixed;
  right: 0;
  margin: unset;
  inset-inline-start: unset;
`;

export function Snackbar(): JSX.Element {
  const { snackbarData, closeSnackbar } = useSnackbar();

  const handleOnClose = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  return (
    <StyledDialog
      open={snackbarData?.isOpen}
      data-testid="snackbar"
      onClose={handleOnClose}>
      {snackbarData?.contents}
    </StyledDialog>
  );
}
