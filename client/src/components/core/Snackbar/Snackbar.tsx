import React, { memo } from 'react';

import useSnackbar, { SnackbarVariant } from 'features/app/useSnackbar';
import styled from 'styled-components';

import Button from '../Button/Button';

// Note: Snackbars or Toast Snackbars are not recommended
// https://www.magentaa11y.com/checklist-web/toast-snackbar/

const Snackbar = (): null | React.JSX.Element => {
  const { closeSnackbar, data } = useSnackbar();

  if (!data?.isOpen) {
    return null;
  }

  return (
    <StyledDialog
      $variant={data.variant ?? SnackbarVariant.INFO}
      data-testid="snackbar"
      onClose={closeSnackbar}
      open>
      <div>{data.contents}</div>
      <Button aria-label="close" onClick={closeSnackbar}>
        X
      </Button>
    </StyledDialog>
  );
};

Snackbar.displayName = 'Snackbar';

export default memo(Snackbar);

const StyledDialog = styled.dialog<{ $variant: SnackbarVariant }>`
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
  //right: 0;
  bottom: 0;
  // top: 100px;
`;
