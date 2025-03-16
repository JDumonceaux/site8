import React, { memo } from 'react';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const TitleFixed = memo(
  ({ children }: Props): React.JSX.Element => (
    <StyledElement data-testid="title">{children}</StyledElement>
  ),
);

export default TitleFixed;

const StyledElement = styled.div`
  position: sticky;
  top: 50px;
`;
