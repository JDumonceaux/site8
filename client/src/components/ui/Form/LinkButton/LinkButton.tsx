import { ButtonHTMLAttributes } from 'react';
import { Button2 } from '../Button2';
import { StyledLink } from '../StyledLink';

type LinkButtonProps = {
  readonly children: React.ReactNode;
  readonly to?: string;
  readonly href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const LinkButton = ({
  to,
  href,
  ...rest
}: LinkButtonProps): JSX.Element => (
  <StyledLink href={href} to={to}>
    <Button2 id="button" {...rest} />
  </StyledLink>
);
