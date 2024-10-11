import React from 'react';
import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Menu = ({ children }: Props): React.JSX.Element => <StyledElement data-testid="menu">{children}</StyledElement>;

export default Menu;

const StyledElement = styled.div`
  flex: 0 0 250px;
`;
