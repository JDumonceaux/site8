'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const StyledArticle = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="article">{children}</StyledElement>;
};

export default StyledArticle;

const StyledElement = styled.article`
  flex: 1 1 auto;
  padding: 18px;
`;
