import type { FC, ReactNode } from 'react';

import type { LinkProps as BaseLinkProps } from 'react-router-dom';

import StyledLink from '../StyledLink/StyledLink';

export type LinkButtonProps = {
  /** Button label */
  children: ReactNode;
  /** Destination URL */
  to: string;
} & BaseLinkProps;

/** A link styled as a button */
export const LinkButton: FC<LinkButtonProps> = ({
  children,
  to,
  ...rest
}: LinkButtonProps) => (
  <StyledLink role="button" to={to} {...rest}>
    {children}
  </StyledLink>
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;
