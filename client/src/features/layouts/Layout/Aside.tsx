import { type FC, memo } from 'react';

import styled from 'styled-components';

/**
 * Sidebar container with fixed width and padding.
 */
type AsideProps = {
  /** Optional content to render inside the aside */
  children?: React.ReactNode;
};

const Aside: FC<AsideProps> = memo(({ children }) => (
  <Container data-testid="aside">{children}</Container>
));
Aside.displayName = 'Aside';
export default Aside;

// Styled component for the aside layout
const Container = styled.aside`
  flex: 0 0 250px;
  padding: 0 20px;
`;
