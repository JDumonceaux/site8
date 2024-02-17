import { styled } from 'styled-components';

import { ButtonHTMLAttributes } from 'react';

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | undefined;
}>`
  color: ${(props) => (props.$variant === 'primary' ? '#fff' : '#000')};
  background-color: ${(props) =>
    props.$variant === 'primary' ? '#6db144' : '#fff'};
  border: ${(props) =>
    props.$variant === 'primary' ? undefined : '1px solid #6db144'};
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
  border-radius: 5px;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-height: 36px;
  line-height: normal;
  letter-spacing: 1.25px;
  font-weight: 500;
  display: inline-flex;
  justify-content: center;
  &:hover {
    background-color: #24671f;
  }
  &:focus {
    background-color: #24671f;
  }
`;

type ButtonProps = {
  id: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name'>;

export function Button({
  id,
  children,
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <StyledButton id={id} name={id} $variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}
