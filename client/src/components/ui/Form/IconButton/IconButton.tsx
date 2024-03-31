import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

export type IconButtonProps = {
  readonly children: React.ReactNode;
  readonly onClick: () => void;
  readonly 'aria-label': string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'aria-label'>;

export const IconButton = ({
  'aria-label': ariaLabel,
  onClick,
  children,
  ...rest
}: IconButtonProps): JSX.Element => (
  <StyledButton
    aria-label={ariaLabel}
    onClick={onClick}
    type="button"
    {...rest}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  > svg {
  }
`;
