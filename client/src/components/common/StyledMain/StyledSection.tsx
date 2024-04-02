'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const StyledSection = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="sction">{children}</StyledElement>;
};

export default StyledSection;

const StyledElement = styled.section`
  flex: 1 1 auto;
  padding: 18px;
`;
