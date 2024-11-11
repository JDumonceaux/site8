import React from 'react';
import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Flex = ({ children }: Props): React.JSX.Element => (
  <StyledElement data-testid="layout">{children}</StyledElement>
);

export default Flex;

const StyledElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  row-gap: 20px;
`;
