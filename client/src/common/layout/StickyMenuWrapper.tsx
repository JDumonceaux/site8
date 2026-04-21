import type { JSX, ReactNode } from 'react';

import styled, { css } from 'styled-components';

type StickyMenuWrapperProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly variant?: 'card' | 'plain';
};

const StickyMenuWrapper = ({
  children,
  className,
  variant = 'card',
}: StickyMenuWrapperProps): JSX.Element => {
  return (
    <Container
      $variant={variant}
      className={className}
    >
      {children}
    </Container>
  );
};

export default StickyMenuWrapper;

const Container = styled.div<{ $variant: 'card' | 'plain' }>`
  position: sticky;
  top: var(--layout-sticky-top, 3.75rem);
  z-index: 10;

  ${({ $variant }) =>
    $variant === 'card'
      ? css`
          margin-top: 0;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background-color: var(--surface-background-color, #fff);
          border: 1px solid var(--border-light);
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        `
      : css`
          margin-top: 0;
        `}
`;
