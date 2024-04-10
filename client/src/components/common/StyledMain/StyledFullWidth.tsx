'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
};

const StyledFullWidth = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="fullWidth">{children}</StyledElement>;
};

export default StyledFullWidth;

const StyledElement = styled.div`
  background-color: var(--palette-dark-background);
  height: 100vh;
  width: 100vw;
`;
