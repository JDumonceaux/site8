import type { ButtonHTMLAttributes } from 'react';

import { styled } from 'styled-components';

type ButtonProps = {
  readonly children: React.ReactNode;
  readonly id: string;
  readonly variant?: 'primary' | 'secondary';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name' | 'type'>;

/**
 * Button component.
 *
 * @component
 * @param {string} id - The ID of the button.
 * @param {ReactNode} children - The content of the button.
 * @param {string} variant - The variant of the button (default: 'primary').
 * @param {ButtonProps} rest - Additional props for the button.
 * @returns {React.JSX.Element} The rendered Button component.
 */
const Button = ({
  children,
  id,
  variant = 'primary',
  ...rest
}: ButtonProps): React.JSX.Element => (
  <StyledButton id={id} name={id} variant={variant} {...rest} type="button">
    {children}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | undefined;
}>`
  color: ${(props) => (props.variant === 'primary' ? '#fff' : '#000')};
  background-color: ${(props) =>
    props.variant === 'primary' ? '#6db144' : '#fff'};
  border: ${(props) =>
    props.variant === 'primary' ? undefined : '1px solid #6db144'};
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
