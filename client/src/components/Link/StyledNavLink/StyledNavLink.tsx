import type { JSX } from 'react';
import { forwardRef } from 'react';
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
  readonly variant?: Variant;
  readonly 'aria-label'?: string;
};

/**
 * A styled wrapper around react-router's NavLink.
 * Respects active state (automatic aria-current), and supports two color variants.
 */
const StyledNavLink = forwardRef<HTMLAnchorElement, StyledNavLinkProps>(
  (
    { variant = 'light', 'aria-label': ariaLabel, ...navProps },
    ref,
  ): JSX.Element => (
    <Link
      ref={ref}
      variant={variant}
      aria-label={ariaLabel}
      {...navProps}
      // NavLink will add aria-current="page" when active
      end={navProps.end ?? false}
    />
  ),
);

StyledNavLink.displayName = 'StyledNavLink';
export default StyledNavLink;

// ================= Styled Component =================

const Link = styled(NavLink)<{ readonly variant: Variant }>`
  display: block;
  color: ${({ variant }) =>
    variant === 'light' ? 'var(--palette-text)' : 'var(--palette-text-dark)'};
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid var(--palette-black);
    outline-offset: 2px;
  }

  &.active {
    font-weight: bold;
    /* aria-current="page" is automatically set by NavLink */
  }

  &[aria-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
