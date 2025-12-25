import type { JSX, ReactNode, Ref } from 'react';
import {
  Link as BaseLink,
  type LinkProps as BaseLinkProps,
} from 'react-router-dom';

import styled from 'styled-components';

export type StyledLinkProps = BaseLinkProps & {
  readonly 'aria-label'?: string;
  readonly children: ReactNode;
  readonly ref?: Ref<HTMLAnchorElement>;
  readonly variant?: 'dark' | 'light';
};

/**
 * A styled React Router Link with light/dark variants.
 *
 * Note: Pseudo classes must be in the following order: link, visited, hover, active
 */
const StyledLink = ({
  'aria-label': ariaLabel,
  children,
  ref,
  variant = 'light',
  ...rest
}: StyledLinkProps): JSX.Element => (
  <StyledBaseLink
    ref={ref}
    $variant={variant}
    aria-label={ariaLabel}
    {...rest}
  >
    {children}
  </StyledBaseLink>
);

StyledLink.displayName = 'StyledLink';
export default StyledLink;

const StyledBaseLink = styled(BaseLink)<{
  readonly $variant: 'dark' | 'light';
}>`
  display: block;
  color: ${({ $variant }) =>
    $variant === 'light' ? 'var(--palette-text)' : 'var(--palette-text-dark)'};
  text-decoration: none;

  &:visited {
    color: ${({ $variant }) =>
      $variant === 'light'
        ? 'var(--palette-text)'
        : 'var(--palette-text-dark)'};
  }

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  &:active {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid var(--palette-black);
    outline-offset: 2px;
  }

  &[aria-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
