import type { JSX } from 'react';

import styled from 'styled-components';

/**
 * A heading that remains fixed at the top when scrolling.
 * Uses a sticky position to stay 50px below the viewport top.
 */
type TitleFixedProps = {
  /** Content to render inside the fixed title */
  children: React.ReactNode;
};

const TitleFixed = ({ children }: TitleFixedProps): JSX.Element | null => {
  return (
    <StickyHeading
      aria-level={1}
      data-testid="title"
      role="heading"
    >
      {children}
    </StickyHeading>
  );
};

TitleFixed.displayName = 'TitleFixed';
export default TitleFixed;

// Styled heading that sticks 50px from the top, with a background to prevent overlap
const StickyHeading = styled.h1`
  position: sticky;
  top: 50px;
  margin: 0;
  padding: 0.5rem 1rem;
  background: var(--palette-background, #fff);
  z-index: 1000;
`;
