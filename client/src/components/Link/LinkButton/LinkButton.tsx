import type { JSX, ReactNode } from 'react';
import { forwardRef } from 'react';
import type { LinkProps as BaseLinkProps, To } from 'react-router-dom';

import StyledLink from '../StyledLink/StyledLink';

export type LinkButtonProps = {
  /** Button label */
  readonly children: ReactNode;
  /** Destination URL */
  readonly to: To;
} & Omit<BaseLinkProps, 'to' | 'children'>;

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
        to={to}
        ref={ref}
        rel={rel}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  },
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;
