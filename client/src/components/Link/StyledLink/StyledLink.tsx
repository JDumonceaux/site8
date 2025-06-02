import type { JSX, ReactNode } from 'react';

import {
  Link as BaseLink,
  type LinkProps as BaseLinkProps,
} from 'react-router-dom';
import styled from 'styled-components';

export type StyledLinkProps = BaseLinkProps & {
  readonly ariaLabel?: string;
  readonly children: ReactNode;
  readonly variant?: 'dark' | 'light';
};

/**
 * A styled React Router Link with light/dark variants.
 *
 * Note: Pseudo classes must be in the following order: link, visited, hover, active
 */
export const StyledLink = ({
  ariaLabel,
  children,
  variant = 'light',
  ...rest
}: StyledLinkProps): JSX.Element | null => (
  <StyledBaseLink
    $variant={variant}
    aria-current="page"
    aria-label={ariaLabel}
    {...rest}>
    {children}
  </StyledBaseLink>
);

StyledLink.displayName = 'StyledLink';
export default StyledLink;

const StyledBaseLink = styled(BaseLink)<{ $variant: 'dark' | 'light' }>`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: ${({ $variant }) =>
      $variant === 'light'
        ? 'var(--palette-text)'
        : 'var(--palette-text-dark)'};
  }
  display: block;
`;
