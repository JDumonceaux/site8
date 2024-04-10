import { ButtonHTMLAttributes } from 'react';
import StyledLink from '../StyledLink/StyledLink';

type LinkButtonProps = {
  readonly children: React.ReactNode;
  readonly to: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const LinkButton = ({ to, children }: LinkButtonProps): JSX.Element => (
  <StyledLink to={to}>
    {/* <Button2 id="button" {...rest} /> */}
    {children}
  </StyledLink>
);
