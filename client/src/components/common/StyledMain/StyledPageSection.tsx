'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const StyledPageSection = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="sction">{children}</StyledElement>;
};

export default StyledPageSection;

const StyledElement = styled.section`
  height: 100vh;
`;
