'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
};

const StyledAside = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="aside">{children}</StyledElement>;
};

export default StyledAside;

const StyledElement = styled.div`
  flex: 0 0 200px;
`;
