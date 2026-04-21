import type { JSX, Ref } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';

import styled from 'styled-components';

/**
 * Variants for link color theming.
 */
type Variant = 'dark' | 'light';

/**
 * Props for our styled NavLink.
 * - All react-router NavLinkProps (minus aria-current, handled internally)
 * - Optional `variant` for light/dark color
 * - Optional `aria-label` for accessibility
 */
export type StyledNavLinkProps = Omit<NavLinkProps, 'aria-current'> & {
  readonly 'aria-label'?: string;
  readonly ref?: Ref<HTMLAnchorElement>;
  readonly variant?: Variant;
};

/**
 * A styled wrapper around react-router's NavLink.
 * Respects active state (automatic aria-current), and supports two color variants.
 */
const StyledNavLink = ({
  'aria-label': ariaLabel,
  ref,
  variant = 'light',
  ...navProps
}: StyledNavLinkProps): JSX.Element => (
  <Link
    aria-label={ariaLabel}
    ref={ref}
    variant={variant}
    {...navProps}
    // NavLink will add aria-current="page" when active
    end={navProps.end ?? false}
  />
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
