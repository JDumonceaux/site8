import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

export type IconButtonProps = {
  readonly 'aria-label': string;
  readonly children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>;

export const IconButton = ({
  'aria-label': ariaLabel,
  children,
  ...rest
}: IconButtonProps): JSX.Element => (
  <StyledButton aria-label={ariaLabel} type="button" {...rest}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  > svg {
  }
`;
