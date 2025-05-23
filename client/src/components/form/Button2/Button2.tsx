import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

type Variant = 'primary' | 'secondary';

export type Button2Props = {
  /** Button content */
  children: ReactNode;
  /** Optional leading icon */
  icon?: ReactNode;
  /** Unique identifier (applied to both `id` and `name`) */
  id: string;
  /** CSS margin-bottom value */
  marginBottom?: string;
  /** Visual style variant */
  variant?: Variant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name' | 'type'>;

/**
 * Styled button with optional icon, full-width, neumorphic shadows.
 */
export const Button2: FC<Button2Props> = ({
  children,
  icon,
  id,
  marginBottom,
  variant = 'primary',
  ...rest
}) => (
  <StyledButton
    $margin={marginBottom}
    $variant={variant}
    id={id}
    name={id}
    type="button"
    {...rest}>
    {icon ? <IconWrapper>{icon}</IconWrapper> : null}
    {children}
  </StyledButton>
);

Button2.displayName = 'Button2';
export default Button2;

const StyledButton = styled.button<{
  $margin?: string;
  $variant: Variant;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 36px;
  padding: 6px 16px;
  margin-bottom: ${({ $margin }) => $margin};
  border: none;
  border-radius: 20px;
  background: #fff;
  color: #424242;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1.25px;
  box-shadow:
    -3px -3px 10px #c7c7c7,
    ${({ $variant }) =>
      $variant === 'secondary'
        ? '2px 2px 10px rgba(190,52,85,0.4), 6px 6px 10px #bebebe'
        : '6px 6px 10px #bebebe'};

  &:hover,
  &:focus-visible {
    box-shadow:
      -4px -4px 10px #bebebe,
      2px 2px 10px #c7c7c7;
    outline: none;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
  & > svg {
    width: 1em;
    height: 1em;
  }
`;
