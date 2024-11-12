import React from 'react';

import {
  Link as BaseLink,
  type LinkProps as BaseLinkProps,
} from 'react-router-dom';
import { styled } from 'styled-components';

type StyledLinkProps = {
  readonly ariaLabel?: string;
  readonly children: React.ReactNode;
  readonly to: string;
  readonly variant?: 'dark' | 'light';
} & BaseLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

const StyledLink = ({
  ariaLabel,
  children,
  to,
  variant = 'light',
}: StyledLinkProps): React.JSX.Element => {
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

export default StyledLink;

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
