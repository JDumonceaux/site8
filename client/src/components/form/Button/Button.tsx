import {
  memo,
  type JSX,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';
import styled from 'styled-components';

export type Variant = 'primary' | 'secondary';

export type ButtonProps = {
  /** Button content */
  children: ReactNode;
  /** Unique identifier applied to both `id` and `name` attributes */
  id: string;
  /** Visual style variant; defaults to `primary` */
  variant?: Variant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name' | 'type'>;

const Button = ({
  children,
  id,
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton id={id} name={id} type="button" $variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

const MemoButton = memo(Button);
MemoButton.displayName = 'Button';
export default MemoButton;

/* -- styled components -- */
const StyledButton = styled.button<{ $variant: Variant }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 36px;
  padding: 6px 16px;
  border-radius: 5px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1.25px;
  line-height: normal;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  color: ${({ $variant }) => ($variant === 'primary' ? '#fff' : '#000')};
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? '#6db144' : '#fff'};
  border: ${({ $variant }) =>
    $variant === 'primary' ? 'none' : '1px solid #6db144'};

  &:hover,
  &:focus-visible {
    background-color: #24671f;
    outline: none;
  }
`;
