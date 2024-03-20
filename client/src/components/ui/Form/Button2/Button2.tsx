import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

type Button2Props = {
  readonly id: string;
  readonly children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name'>;

export const Button2 = ({
  id,
  children,
  ...rest
}: Button2Props): JSX.Element => (
  <StyledButton id={id} name={id} {...rest}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
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
    -3px -3px 10px #c7c7c7,
    6px 6px 10px #bebebe;
  &:hover {
    box-shadow:
      -4px -4px 10px #bebebe,
      2px 2px 10px #c7c7c7;
  }
`;
