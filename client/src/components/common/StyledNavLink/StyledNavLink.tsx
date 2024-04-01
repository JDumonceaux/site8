import React from 'react';
import { NavLink as BaseNavLink } from 'react-router-dom';
import type { NavLinkProps as BaseNavLinkProps } from 'react-router-dom';
import { styled } from 'styled-components';

type StyledNavLinkProps = {
  readonly to: string;
  readonly ariaLabel?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
} & BaseNavLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

const StyledNavLink = ({
  to,
  ariaLabel,
  className,
  children,
}: StyledNavLinkProps): JSX.Element => {
  return (
    <StyledElement
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
const StyledElement = styled(BaseNavLink)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--palette-text);
  }
`;
