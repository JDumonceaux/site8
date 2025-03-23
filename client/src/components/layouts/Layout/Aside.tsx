import React, { memo } from 'react';

import { styled } from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
};

const Aside = memo(
  ({ children }: Props): React.JSX.Element => (
    <StyledElement data-testid="aside">{children}</StyledElement>
  ),
);

Aside.displayName = 'Aside';

export default Aside;

const StyledElement = styled.div`
  flex: 0 0 250px;
  padding: 0 20px;
`;
