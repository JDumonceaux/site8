import type { JSX, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

/**
 * Available style variants for Button2
 */
export type Variant = 'primary' | 'secondary';

/**
 * Props for the styled full-width button with optional icon.
 */
export type Button2Props = {
  /** Button text or content */
  children: ReactNode;
  /** Optional leading icon element */
  icon?: ReactNode;
  /** Unique identifier used for both id and name */
  id: string;
  /** Optional bottom margin (CSS value) */
  marginBottom?: string;
  /** Visual variant (affects shadow styling) */
  variant?: Variant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name' | 'type'>;

/**
 * Styled button with optional icon, full-width layout, and neumorphic shadows.
 *
 * Using a named function with explicit `JSX.Element` return type
 * avoids the implicit `children` prop that comes with `FC<>`.
 */
export function Button2({
  children,
  icon,
  id,
  marginBottom,
  variant = 'primary',
  ...rest
}: Button2Props): JSX.Element {
  return (
    <StyledButton
      $margin={marginBottom}
      $variant={variant}
      id={id}
      name={id}
      type="button"
      {...rest}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
}

export default Button2;

/* -- styled components -- */
const StyledButton = styled.button<{ $margin?: string; $variant: Variant }>`
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
