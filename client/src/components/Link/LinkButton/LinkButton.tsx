import { ButtonHTMLAttributes, memo } from 'react';

import StyledLink from '../StyledLink/StyledLink';

type LinkButtonProps = {
  readonly children: React.ReactNode;
  readonly to: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Renders a button that acts as a link.
 *
 * @component
 * @param {string} to - The URL to navigate to when the button is clicked.
 * @param {React.ReactNode} children - The content of the button.
 * @returns {JSX.Element} - The rendered LinkButton component.
 */
const LinkButton = ({ children, to }: LinkButtonProps): JSX.Element => (
  <StyledLink to={to}>{children}</StyledLink>
);

export default memo(LinkButton);
