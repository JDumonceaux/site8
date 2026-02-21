import type { ButtonHTMLAttributes, JSX } from 'react';

import styled, { css, keyframes } from 'styled-components';

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
  isFullWidth?: boolean;
  /** Visual size of the button */
  size?: Size;
  type?: 'button' | 'reset' | 'submit';
  /** Visual style variant */
  variant?: Variant;
};

/** Transient styling props (never forwarded to the DOM) */
type StyledButtonProps = {
  $fullWidth: boolean;
  $size: Size;
  $variant: Variant;
};

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  discreet: css`
    background: transparent;
    color: var(--text-primary-color);
  `,
  ghost: css`
    background: transparent;
    color: var(--text-secondary-color);
    border: 1px solid var(--border-light);

    &:hover:not(:disabled) {
      background: transparent;
      border-color: var(--border-light);
      color: var(--text-primary-color);
    }

    &:active:not(:disabled) {
      background: transparent;
    }
  `,
  primary: css`
    background: var(--palette-grey-20);
    color: var(--color-black);
  `,
  secondary: css`
    background: var(--surface-elevated-color);
    color: var(--text-primary-color);
  `,
};

const getVariantStyles = (variant: Variant): ReturnType<typeof css> =>
  variantStyles[variant];

const sizeStyles: Record<Size, ReturnType<typeof css>> = {
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
  xl: css`
    font-size: 1.25rem;
    padding: 1.25rem 1.5rem;
  `,
  xs: css`
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  `,
};

const getSizeStyles = (size: Size): ReturnType<typeof css> => sizeStyles[size];

const getHoverBrightness = (variant: Variant): string =>
  variant === 'primary' ? 'brightness(1.01)' : 'brightness(1.02)';

const getActiveBrightness = (variant: Variant): string =>
  variant === 'primary' ? 'brightness(0.99)' : 'brightness(0.98)';

const pressAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.985);
  }

  100% {
    transform: scale(1);
  }
`;

/**
 * Core styled `<button>` using only transient props
 */
const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 6.5rem;
  border: none;
  border-radius: var(--border-radius-md);
  font-family: inherit;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    transform 100ms ease;

  ${({ $variant }) => getVariantStyles($variant)};
  ${({ $size }) => getSizeStyles($size)};
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:hover:not(:disabled) {
    transform: translateY(0);
    filter: ${({ $variant }) => getHoverBrightness($variant)};
  }
  &:active:not(:disabled) {
    animation: ${pressAnimation} 140ms ease-out;
    filter: ${({ $variant }) => getActiveBrightness($variant)};
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
  isFullWidth = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      $fullWidth={isFullWidth}
      $size={size}
      $variant={variant}
      type={type}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

Button.displayName = 'Button';
export default Button;
