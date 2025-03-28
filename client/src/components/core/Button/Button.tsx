import { memo, type ButtonHTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

const VARIANTS = Object.freeze({
  discreet: 'discreet',
  ghost: 'ghost',
  primary: 'primary',
  secondary: 'secondary',
} as const);

type Variant = keyof typeof VARIANTS;

const SIZES = Object.freeze({
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xl: 'xl',
  xs: 'xs',
} as const);

type Size = keyof typeof SIZES;

type ButtonProps = {
  readonly children: React.ReactNode;
  readonly size?: Size;
  readonly type?: 'button' | 'reset' | 'submit';
  readonly variant?: Variant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const Button = ({
  children,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) => (
  <StyledButton
    data-testid="Button"
    type={type}
    {...rest}
    $size={size}
    $variant={variant}>
    {children}
  </StyledButton>
);

Button.displayName = 'Button';

export default memo(Button);

const StyledButton = styled.button<{
  $size?: Size;
  $variant?: Variant;
}>`
  border-radius: 50%;

  ${(props) => css`
    background-color: ${(() => {
      switch (props.$variant) {
        case VARIANTS.discreet: {
          return 'var(--background-color-discreet)';
        }
        case VARIANTS.ghost: {
          return 'var(--background-color-ghost, #ffffff)';
        }
        case VARIANTS.secondary: {
          return 'var(--background-color-secondary, #000014)';
        }
        default: {
          return 'var(--background-color-primary, #000000)';
        }
      }
    })()};
    color: ${(() => {
      switch (props.$variant) {
        case VARIANTS.secondary: {
          return 'var(--text-color-secondary, #000000)';
        }
        default: {
          return 'var(--text-color-primary, #ffffff)';
        }
      }
    })()};
    max-height: ${(() => {
      switch (props.$size) {
        case SIZES.lg: {
          return '48px';
        }
        case SIZES.md: {
          return '40px';
        }
        case SIZES.sm: {
          return '32px';
        }
        case SIZES.xl: {
          return '56px';
        }
        case SIZES.xs: {
          return '24px';
        }
        default: {
          return '40px';
        }
      }
    })()};
  `}
`;
