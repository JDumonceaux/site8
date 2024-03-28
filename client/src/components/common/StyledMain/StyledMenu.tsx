'use client';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const StyledMenu = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="menu">{children}</StyledElement>;
};

export default StyledMenu;

const StyledElement = styled.div`
  flex: 0 0 250px;
`;
