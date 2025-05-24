import { memo, type JSX } from 'react';

import styled from 'styled-components';

// Compute once at module load
const currentYear = new Date().getFullYear();

/**
 * Application footer with automatic year update.
 */
const Footer = (): JSX.Element => {
  return (
    <FooterContainer data-testid="footer">
      <CopyrightText>&copy; {currentYear}</CopyrightText>
    </FooterContainer>
  );
};

Footer.displayName = 'Footer';
export default memo(Footer);

// --------------------------------------------------------------------------------
// Styled Components
// --------------------------------------------------------------------------------

const FooterContainer = styled.footer`
  /* native <footer> already implies role="contentinfo" */
  background-color: var(--palette-main-color, #000);
  color: var(--palette-grey-10, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 1rem;
`;

const CopyrightText = styled.small`
  font-size: 0.8rem;
`;
