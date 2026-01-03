import type { JSX, ReactNode } from 'react';

import { MenuIcon } from '@components/ui/icons/MenuIcon';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import { APP_NAME } from '@lib/utils/constants';
import styled from 'styled-components';

type HeaderProps = {
  /** User avatar or avatar-trigger element */
  avatar?: ReactNode;
  /** If provided, shows a menu button that calls this on click */
  onMenuToggle?: () => void;
};

/**
 * Page header with optional menu toggle and avatar slot.
 */
const Header = ({ avatar, onMenuToggle }: HeaderProps): JSX.Element => {
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onMenuToggle?.();
  };

  return (
    <HeaderContainer>
      <SkipNav href="#main-content">Skip to main content</SkipNav>

      <NavGroup aria-label="Main navigation">
        {onMenuToggle ? (
          <MenuButton
            aria-label="Toggle navigation menu"
            onClick={handleMenuClick}
            type="button"
          >
            <MenuIcon />
          </MenuButton>
        ) : null}

        <LogoLink
          aria-label={`${APP_NAME} Home`}
          to="/"
        >
          {APP_NAME}
        </LogoLink>
      </NavGroup>

      <AvatarGroup aria-label="User menu">{avatar}</AvatarGroup>
    </HeaderContainer>
  );
};

Header.displayName = 'Header';
export default Header;

// ---------------- Styled Components ----------------

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5rem;
  background: var(--palette-main-color, #000);
  box-shadow: 0 5px 20px -10px #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 1000;
`;

const SkipNav = styled.a`
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  &:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    background: var(--palette-grey-10);
    color: var(--palette-main-color);
    font-weight: bold;
    text-decoration: none;
  }
`;

const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--palette-grey-10);

  &:hover,
  &:focus-visible {
    color: var(--palette-grey-5);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring-color, #2684ff);
    outline-offset: 2px;
  }
`;

const LogoLink = styled(StyledLink)`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--palette-grey-10);

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

