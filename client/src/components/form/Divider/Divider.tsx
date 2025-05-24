import type { JSX, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

/**
 * Props for the horizontal divider.
 */
export type DividerProps = {
  /** Optional content to display between the lines */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * A horizontal divider with optional centered content.
 *
 * Using an explicit return type (`JSX.Element`) avoids the implicit `children`
 * prop and extra overhead of `FC<>`.
 */
export function Divider({ children, ...rest }: DividerProps): JSX.Element {
  return (
    <Container {...rest}>
      <Line aria-hidden="true" />
      {children && <Content>{children}</Content>}
      <Line aria-hidden="true" />
    </Container>
  );
}

export default Divider;

/* -- styled components -- */
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

const Line = styled.hr`
  flex: 1;
  margin: 0;
  border: none;
  border-top: 1px solid var(--divider-color, #727272);
`;

const Content = styled.div`
  white-space: nowrap;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted, #555);
`;
