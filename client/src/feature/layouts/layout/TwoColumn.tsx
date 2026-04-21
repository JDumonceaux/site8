import type { JSX } from 'react';

import styled from 'styled-components';

/**
 * Two-column layout component following SOLID principles.
 */
type TwoColumnProps = {
  /** The content to display in the two-column layout */
  children: React.ReactNode;
};

const TwoColumn = ({ children }: TwoColumnProps): JSX.Element | null => {
  return <Container data-testid="two-column">{children}</Container>;
};

TwoColumn.displayName = 'TwoColumn';
export default TwoColumn;

// Styled components for the two-column layout
const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  gap: 1rem;
  width: 100%;
`;
