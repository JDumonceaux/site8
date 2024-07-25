import React from 'react';
import { NavLink as BaseLink } from 'react-router-dom';
import type { NavLinkProps as BaseNavLinkProps } from 'react-router-dom';
import { styled } from 'styled-components';

type StyledNavLinkProps = {
  readonly to: string;
  readonly ariaLabel?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly variant?: 'light' | 'dark';
} & BaseNavLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

const StyledNavLink = ({
  to,
  ariaLabel,
  className,
  variant = 'light',
  children,
}: StyledNavLinkProps): JSX.Element => {
  return (
    <StyledElement
      $variant={variant}
      aria-current="page"
      aria-label={ariaLabel ? ariaLabel : children?.toString()}
      className={className}
      to={to}>
      {children}
    </StyledElement>
  );
};

export default StyledNavLink;

// Note: Pseudo classes must be in the following order: link, visited, hover, active
const StyledElement = styled(BaseLink)<{ $variant?: 'light' | 'dark' }>`
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
