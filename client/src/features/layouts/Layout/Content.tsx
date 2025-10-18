import type { JSX } from 'react';
import styled from 'styled-components';

/**
 * Content wrapper that spans full width.
 */
type ContentProps = {
  /** Optional content to render */
  children?: React.ReactNode;
};

const Content = ({ children }: ContentProps): JSX.Element | null => (
  <Container data-testid="content">{children}</Container>
);

Content.displayName = 'Content';
export default Content;

// Styled component for content area
const Container = styled.div`
  width: 100%;
`;
