import type { JSX, ReactNode } from 'react';

import type { LinkProps as BaseLinkProps } from 'react-router-dom';

import StyledLink from '../StyledLink/StyledLink';

export type LinkButtonProps = {
  /** Button label */
  children: ReactNode;
  /** Destination URL */
  to: string;
} & BaseLinkProps;

/** A link styled as a button */
export const LinkButton = ({
  children,
  to,
  ...rest
}: LinkButtonProps): JSX.Element | null => (
  <StyledLink role="button" to={to} {...rest}>
    {children}
  </StyledLink>
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;
