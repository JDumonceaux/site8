'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const StyledArticle = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="article">{children}</StyledElement>;
};

export default StyledArticle;

const StyledElement = styled.div`
  flex: 1 1 auto;
`;
