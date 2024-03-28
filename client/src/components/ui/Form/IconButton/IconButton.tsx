import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

export type IconButtonProps = {
  readonly id: string;
  readonly icon: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name'>;

export const IconButton = ({
  id,
  icon,
  ...rest
}: IconButtonProps): JSX.Element => (
  <StyledButton id={id} name={id} {...rest}>
    {icon}
  </StyledButton>
);

const StyledButton = styled.button`
  > svg {
  }
`;
