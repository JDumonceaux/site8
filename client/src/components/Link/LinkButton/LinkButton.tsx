import type { ButtonHTMLAttributes } from 'react';

import StyledLink from '../StyledLink/StyledLink';

type LinkButtonProps = {
  readonly children: React.ReactNode;
  readonly to: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ children, to }: LinkButtonProps): React.JSX.Element => (
  <StyledLink to={to}>{children}</StyledLink>
);

export default LinkButton;
