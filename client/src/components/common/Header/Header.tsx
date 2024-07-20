import { Avatar } from 'components';
import { memo } from 'react';
import { APP_NAME } from 'utils/constants';
import { MenuIcon } from '../../icons/MenuIcon';
import StyledLink from '../Link/StyledLink/StyledLink';

// Single Responsibility Principle (SRP)
// Cyclomatic Complexity: 2 (low)
// Cognitive Complexity: Low (easy to understand)
// Maintainability Index: Approximately 130.2 (good maintainability)

type HeaderProps = {
  readonly includeMenu?: boolean;
};

/**
 * Renders the header component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.includeMenu - Whether to include the menu icon.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = ({ includeMenu = false }: HeaderProps): JSX.Element => {
  return (
    <StyledHeader data-testid="header">
      <div>
        <StyledSkipLink href="#main">Skip to main content</StyledSkipLink>
        {includeMenu ? <MenuIcon /> : null}
        <StyledLinkDiv>
          <StyledLink to="/">
            <AppName>{APP_NAME}</AppName>
          </StyledLink>
        </StyledLinkDiv>
      </div>
      <Avatar />
    </StyledHeader>
  );
};

export default memo(Header);

import { styled } from 'styled-components';

export const StyledHeader = styled.header`
  background-color: var(--palette-main-color, #000);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  box-shadow: 0 5px 20px -10px #000;
  margin-bottom: 2px;
`;
export const StyledSkipLink = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:focus {
    position: static;
    width: auto;
    height: auto;
  }
`;
export const AppName = styled.div`
  color: var(--palette-grey-10, #fff);
  font-size: 1.1rem;
`;
export const StyledLinkDiv = styled.div`
  a:hover {
    text-decoration-color: #5f1a2a;
  }
  a {
    display: block;
  }
  div {
    padding: 3px 16px;
  }
`;
