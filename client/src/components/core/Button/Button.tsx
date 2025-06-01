import type { JSX, ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

// Allowed visual variants
export const VARIANTS = ['discreet', 'ghost', 'secondary', 'primary'] as const;
export type Variant = (typeof VARIANTS)[number];

// Allowed size options
export const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Size = (typeof SIZES)[number];

/** Public props for Button */
export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  /** Stretch to fill its parent container */
  fullWidth?: boolean;
  /** Visual size of the button */
  size?: Size;
  /** Visual style variant */
  variant?: Variant;
  type?: 'button' | 'submit' | 'reset';
};

/** Transient styling props (never forwarded to the DOM) */
type StyledButtonProps = {
  $fullWidth: boolean;
  $size: Size;
  $variant: Variant;
};

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  discreet: css`
    background: var(--bg-discreet);
    color: var(--text-primary);
  `,
  ghost: css`
    background: transparent;
    color: var(--text-primary);
  `,
  primary: css`
    background: var(--bg-primary);
    color: var(--text-on-primary);
  `,
  secondary: css`
    background: var(--bg-secondary);
    color: var(--text-secondary);
  `,
};

const sizeStyles: Record<Size, ReturnType<typeof css>> = {
  xl: css`
    font-size: 1.25rem;
    padding: 1.25rem 1.5rem;
  `,
  lg: css`
    font-size: 1.125rem;
    padding: 1rem 1.25rem;
  `,
  md: css`
    font-size: 1rem;
    padding: 0.75rem 1rem;
  `,
  sm: css`
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  `,
  xs: css`
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  `,
};

/**
 * Core styled `<button>` using only transient props
 */
const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-family: inherit;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    transform 100ms ease;

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $size }) => sizeStyles[$size]};
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
    filter: brightness(0.95);
  }
  &:focus-visible {
    outline: 2px solid var(--focus-ring, #2684ff);
    outline-offset: 2px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

/**
 * A SOLID-compliant Button component.
 * - Defaults `type="button"` to prevent accidental form submits.
 * - Prop → transient‐prop mapping keeps the DOM clean.
 */
const Button = ({
  children,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
      type={type}
      {...rest}>
      {children}
    </StyledButton>
  );
};

Button.displayName = 'Button';
export default Button;
