import { forwardRef, type JSX, type ReactNode } from 'react';
import type { LinkProps as BaseLinkProps, To } from 'react-router-dom';

import StyledLink from '../styled-link/StyledLink';

export type LinkButtonProps = {
  /** Button label */
  readonly children: ReactNode;
  /** Destination URL */
  readonly to: To;
} & Omit<BaseLinkProps, 'children' | 'to'>;

/**
 * A link styled as a button.
 * Provides button-like appearance while maintaining link semantics for navigation.
 */
const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ children, to, ...rest }, ref): JSX.Element => {
    // Combine rel attributes, ensuring security for target="_blank"
    const rel =
      rest.target === '_blank'
        ? `noopener noreferrer${rest.rel ? ` ${rest.rel}` : ''}`
        : rest.rel;

    return (
      <StyledLink
        ref={ref}
        rel={rel}
        to={to}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  },
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;
