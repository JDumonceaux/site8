import React from 'react';
import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Main = ({ children }: Props): React.JSX.Element => <StyledElement data-testid="main">{children}</StyledElement>;

export default Main;

const StyledElement = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
