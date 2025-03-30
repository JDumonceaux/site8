import React, { memo } from 'react';

import styled from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Article = memo(
  ({ children }: Props): React.JSX.Element => (
    <StyledElement data-testid="article">{children}</StyledElement>
  ),
);

Article.displayName = 'Article';

export default Article;

const StyledElement = styled.article`
  flex: 1 1 auto;
  padding: 18px;
`;
