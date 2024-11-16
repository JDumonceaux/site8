import 'components/modals/core/main.css';
import React, { type ButtonHTMLAttributes, memo } from 'react';

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
  ${(props) => {
    switch (props.$variant) {
      case VARIANTS.discreet: {
        return css`
          background-color: var(--background-color-discreet, #ffffff);
        `;
      }
      case VARIANTS.ghost: {
        return css`
          background-color: var(--background-color-ghost, #ffffff);
        `;
      }
      case VARIANTS.primary: {
        throw new Error('Not implemented yet: undefined case');
      }
      case VARIANTS.secondary: {
        return css`
          color: var(--text-color-secondary, #000000);
          background-color: var(--background-color-secondary, #000014);
        `;
      }
      default: {
        return css`
          color: var(--text-color-primary, #ffffff);
          background-color: var(--background-color-primary, #000000);
        `;
      }
    }
  }}
  ${(props) => {
    switch (props.$size) {
      case SIZES.lg: {
        return css`
          max-height: 48px;
        `;
      }
      case SIZES.md: {
        return css`
          max-height: 40px;
        `;
      }
      case SIZES.sm: {
        return css`
          max-height: 32px;
        `;
      }
      case SIZES.xl: {
        return css`
          max-height: 56px;
        `;
      }
      case SIZES.xs: {
        return css`
          max-height: 24px;
        `;
      }
      default: {
        return css`
          max-height: 40px;
        `;
      }
    }
  }}
`;
