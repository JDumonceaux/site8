import React from 'react';

import {
  NavLink as BaseLink,
  type NavLinkProps as BaseNavLinkProps,
} from 'react-router-dom';
import { styled } from 'styled-components';

type StyledNavLinkProps = {
  readonly ariaLabel?: string;
  readonly children: React.ReactNode;
  readonly to: string;
  readonly variant?: 'dark' | 'light';
} & BaseNavLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

const StyledNavLink = ({
  ariaLabel,
  children,
  to,
  variant = 'light',
}: StyledNavLinkProps): React.JSX.Element => {
  return (
    <StyledElement
      $variant={variant}
      aria-current="page"
      aria-label={ariaLabel ?? children?.toString()}
      to={to}>
      {children}
    </StyledElement>
  );
};

export default StyledNavLink;

// Note: Pseudo classes must be in the following order: link, visited, hover, active
const StyledElement = styled(BaseLink)<{ $variant?: 'dark' | 'light' }>`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: ${(props) =>
      props.$variant === 'light'
        ? `var(--palette-text)`
        : `var(--palette-text-dark)`};
  }
  display: block;
`;
