import React from 'react';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Article = ({ children }: Props): React.JSX.Element => (
  <StyledElement data-testid="article">{children}</StyledElement>
);

export default Article;

const StyledElement = styled.article`
  flex: 1 1 auto;
  padding: 18px;
`;
