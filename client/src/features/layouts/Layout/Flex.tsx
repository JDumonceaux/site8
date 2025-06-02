import type { JSX } from 'react';
import styled from 'styled-components';

/**
 * A flexible row container for laying out child elements in a horizontal flow.
 */
type FlexProps = {
  /** Elements to render inside the flex container */
  children: React.ReactNode;
};

const Flex = ({ children }: FlexProps): JSX.Element => (
  <Container data-testid="layout">{children}</Container>
);

Flex.displayName = 'Flex';
export default Flex;

// Styled component defining the flex layout
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 20px;
`;
