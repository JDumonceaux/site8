import React, { memo } from 'react';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Main = memo(
  ({ children }: Props): React.JSX.Element => (
    <StyledElement data-testid="main">{children}</StyledElement>
  ),
);

export default Main;

const StyledElement = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
`;
