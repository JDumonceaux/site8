import type { JSX, ReactNode, Ref } from 'react';
import type { LinkProps as BaseLinkProps, To } from 'react-router-dom';

import StyledLink from '../styled-link/StyledLink';

export type LinkButtonProps = {
  /** Button label */
  readonly children: ReactNode;
  /** Ref to the anchor element */
  readonly ref?: Ref<HTMLAnchorElement>;
  /** Destination URL */
  readonly to: To;
} & Omit<BaseLinkProps, 'children' | 'to'>;

/**
 * A link styled as a button.
 * Provides button-like appearance while maintaining link semantics for navigation.
 */
const LinkButton = ({
  children,
  ref,
  to,
  ...rest
}: LinkButtonProps): JSX.Element => {
  // Combine rel attributes, ensuring security for target="_blank"
  const rel =
    rest.target === '_blank'
      ? `noopener noreferrer${rest.rel ? ` ${rest.rel}` : ''}`
      : rest.rel;

  // Extract aria-label to handle undefined properly
  const { 'aria-label': ariaLabel, ...restWithoutAriaLabel } = rest;

  return (
    <StyledLink
      ref={ref}
      rel={rel}
      to={to}
      {...(ariaLabel !== undefined && { 'aria-label': ariaLabel })}
      {...restWithoutAriaLabel}
    >
      {children}
    </StyledLink>
  );
};

LinkButton.displayName = 'LinkButton';
export default LinkButton;
