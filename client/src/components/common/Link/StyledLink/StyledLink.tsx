import React from 'react';
import { Link as BaseLink } from 'react-router-dom';
import type { LinkProps as BaseLinkProps } from 'react-router-dom';
import { styled } from 'styled-components';

type StyledLinkProps = {
  readonly to: string;
  readonly ariaLabel?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly variant?: 'light' | 'dark';
} & BaseLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

const StyledLink = ({
  to,
  ariaLabel,
  className,
  variant = 'light',
  children,
}: StyledLinkProps): JSX.Element => {
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

export default StyledLink;

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
