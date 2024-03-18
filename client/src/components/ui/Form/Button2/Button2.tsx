import { styled } from 'styled-components';

import { ButtonHTMLAttributes } from 'react';

type Button2Props = {
  readonly id: string;
  readonly variant?: 'primary' | 'secondary';
  readonly children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name'>;

export const Button2 = ({
  id,
  children,
  variant = 'primary',
  ...rest
}: Button2Props): JSX.Element => (
  <StyledButton $variant={variant} id={id} name={id} {...rest}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | undefined;
}>`
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  color: #424242;
  width: 100%;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-height: 36px;
  line-height: normal;
  letter-spacing: 1.25px;
  font-weight: 500;
  display: inline-flex;
  justify-content: center;
  // box-shadow:
  //   -6px -6px 10px #f9f9f9,
  //   6px 6px 10px #8888ff;
  box-shadow:
    -6px -6px 10px #f9f9f9,
    6px 6px 10px #bebebe;
  &:hover {
    box-shadow:
      2px 2px 10px #bebebe,
      -2px -2px 10px #f9f9f9;
  }
`;
