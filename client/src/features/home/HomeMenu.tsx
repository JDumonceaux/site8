import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const HomeMenu = (): JSX.Element => {
  return (
    <StyledNav>
      <StyledRootDiv>Programming</StyledRootDiv>
      <StyledPageDiv to="/accessibility">Accessibility</StyledPageDiv>
      <StyledPageDiv to="/code-snippets">Code Snippets</StyledPageDiv>
      <StyledPageDiv to="/html">HTML</StyledPageDiv>
      <StyledPageDiv to="/javascript">JavaScript</StyledPageDiv>
      <StyledPageDiv to="/nextjs">Next.js</StyledPageDiv>
      <StyledPageDiv to="/nodejs">Node.js</StyledPageDiv>
      <StyledPageDiv to="/programming">Programming</StyledPageDiv>
      <StyledPageDiv to="/python">Python</StyledPageDiv>
      <StyledPageDiv to="/react">React</StyledPageDiv>
      <StyledPageDiv to="/typescript">TypeScript</StyledPageDiv>
      <StyledPageDiv to="/web">Web</StyledPageDiv>
      <StyledRootDiv>Design & Development</StyledRootDiv>
      <StyledPageDiv to="/design">Design</StyledPageDiv>
      <StyledPageDiv to="/react-a-z">React A-Z</StyledPageDiv>
      <StyledRootDiv>Cloud & Infrastructure</StyledRootDiv>
      <StyledPageDiv to="/aws">AWS</StyledPageDiv>
      <StyledRootDiv>Career & Management</StyledRootDiv>
      <StyledPageDiv to="/interview-questions">
        Interview Questions
      </StyledPageDiv>
      <StyledPageDiv to="/management">Management</StyledPageDiv>
      <StyledRootDiv>Content & Media</StyledRootDiv>
      <StyledPageDiv to="/images">Images</StyledPageDiv>
      <StyledPageDiv to="/travel">Travel</StyledPageDiv>
      <StyledPageDiv to="/yachts">Yachts</StyledPageDiv>
      <StyledRootDiv>Testing</StyledRootDiv>
      <StyledPageDiv to="/react/testing/test-grid">Test Grid</StyledPageDiv>
    </StyledNav>
  );
};

HomeMenu.displayName = 'HomeMenu';

export default HomeMenu;

const StyledNav = styled.nav`
  color: var(--palette-text-dark);
`;
const StyledRootDiv = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: 1rem;
  text-transform: uppercase;
  padding: 12px 12px 6px 12px;
  background-color: var(--navbar-light-secondary);
  break-inside: avoid;
`;
const StyledPageDiv = styled(NavLink)`
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  padding: 6px 12px 6px 36px;
  background-color: var(--navbar-light-primary);
  break-inside: avoid;
  border-bottom: 1px solid var(--navbar-light-secondary);
  display: block;
`;
