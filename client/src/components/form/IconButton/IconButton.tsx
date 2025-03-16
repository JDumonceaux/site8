import type { ButtonHTMLAttributes } from 'react';

import { styled } from 'styled-components';

type IconButtonProps = {
  readonly 'aria-label': string;
  readonly children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>;

const IconButton = ({
  'aria-label': ariaLabel,
  children,
  ...rest
}: IconButtonProps): React.JSX.Element => (
  <StyledButton aria-label={ariaLabel} type="button" {...rest}>
    {children}
  </StyledButton>
);

IconButton.displayName = 'IconButton';

export default IconButton;

const StyledButton = styled.button`
  background: inherit;
  color: white;
`;
