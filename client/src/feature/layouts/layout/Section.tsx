import type { JSX } from 'react';

import styled from 'styled-components';

/**
 * A flexible section container for layout content.
 */
type SectionProps = {
  /** Content to render within the section */
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps): JSX.Element => (
  <StyledSection data-testid="section">{children}</StyledSection>
);

Section.displayName = 'Section';
export default Section;

// Styled component defining layout behavior
const StyledSection = styled.section`
  flex: 1 1 auto;
  padding: 18px;
`;
