import type { JSX } from 'react';

import { NavLink, type NavLinkProps } from 'react-router-dom';

import styled from 'styled-components';

/**
 * Variants for link color theming.
 */
type Variant = 'light' | 'dark';

/**
 * Props for our styled NavLink.
 * - All react-router NavLinkProps (minus aria-current, handled internally)
 * - Optional `variant` for light/dark color
 * - Optional `aria-label` for accessibility
 */
export type StyledNavLinkProps = Omit<NavLinkProps, 'aria-current'> & {
  variant?: Variant;
  'aria-label'?: string;
};

/**
 * A styled wrapper around react-router’s NavLink.
 * Respects active state (automatic aria-current), and supports two color variants.
 */
export const StyledNavLink = ({
  variant = 'light',
  'aria-label': ariaLabel,
  ...navProps
}: StyledNavLinkProps): JSX.Element | null => (
  <Link
    variant={variant}
    aria-label={ariaLabel}
    {...navProps}
    // NavLink will add aria-current="page" when active
    end={navProps.end ?? false}
  />
);
StyledNavLink.displayName = 'StyledNavLink';
export default StyledNavLink;

// ================= Styled Component =================

const Link = styled(NavLink)<{ variant: Variant }>`
  display: block;
  color: ${({ variant }) =>
    variant === 'light' ? 'var(--palette-text)' : 'var(--palette-text-dark)'};
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  &.active {
    font-weight: bold;
    /* aria-current="page" is automatically set by NavLink */
  }
`;
