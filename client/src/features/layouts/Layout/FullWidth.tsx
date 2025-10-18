import type { JSX } from 'react';
import styled from 'styled-components';

/**
 * Props for <FullWidth>
 */
type FullWidthProps = {
  /** Optional children to render within the full-width container */
  children?: React.ReactNode;
} & Omit<JSX.IntrinsicElements['div'], 'data-testid'>;

/**
 * A container that spans the full viewport width & height.
 */
const FullWidth = ({
  children,
  ...rest
}: FullWidthProps): JSX.Element | null => (
  <Container
    data-testid="fullWidth"
    {...rest}
  >
    {children}
  </Container>
);

FullWidth.displayName = 'FullWidth';
export default FullWidth;

// Styled component for layout
const Container = styled.div`
  background-color: var(--palette-dark-background);
  width: 100vw;
  height: 100vh;
  max-width: 100%;
`;
