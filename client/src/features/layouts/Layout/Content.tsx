import React, { memo } from 'react';

import styled from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
};

const Content = memo(
  ({ children }: Props): React.JSX.Element => (
    <StyledElement data-testid="content">{children}</StyledElement>
  ),
);

Content.displayName = 'Content';

export default Content;

const StyledElement = styled.div`
  padding: 0 20px;
`;
