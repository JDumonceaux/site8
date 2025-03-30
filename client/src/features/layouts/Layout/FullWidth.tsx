import React, { memo } from 'react';

import styled from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'data-testid'>;

const FullWidth = memo(
  ({ children }: Props): React.JSX.Element => (
    <StyledElement data-testid="fullWidth">{children}</StyledElement>
  ),
);

FullWidth.displayName = 'FullWidth';

export default FullWidth;

const StyledElement = styled.div`
  background-color: var(--palette-dark-background);
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;
