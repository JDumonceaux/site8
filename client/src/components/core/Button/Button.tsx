import 'components/modals/core/main.css';
import React, { ButtonHTMLAttributes, memo } from 'react';
import styled, { css } from 'styled-components';

const VARIANTS = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  discreet: 'discreet',
} as const);

const SIZES = Object.freeze({
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const);

type ButtonProps = {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof SIZES;
  readonly variant?: keyof typeof VARIANTS;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly startAdornment?: React.ReactNode;
  readonly endAdornment?: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const Button = ({
  children,
  size = 'md',
  variant = 'primary',
  type = 'button',
  startAdornment,
  endAdornment,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      data-testid="Button"
      type={type}
      {...rest}
      $variant={variant}
      $size={size}>
      {children}
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default memo(Button);

const StyledButton = styled.button<{
  $variant?: keyof typeof VARIANTS;
  $size?: keyof typeof SIZES;
}>`
  border-radius: 50%;
  ${(props) => {
    switch (props.$variant) {
      case VARIANTS.secondary:
        return css`
          color: var(--text-color-secondary, #000000);
          background-color: var(--background-color-secondary, #000014);
        `;
      case VARIANTS.ghost:
        return css`
          background-color: var(--background-color-ghost, #ffffff);
        `;
      case VARIANTS.discreet:
        return css`
          background-color: var(--background-color-discreet, #ffffff);
        `;
      case VARIANTS.primary:
      default:
        return css`
          color: var(--text-color-primary, #ffffff);
          background-color: var(--background-color-primary, #000000);
        `;
    }
  }}
  ${(props) => {
    switch (props.$size) {
      case SIZES.xs:
        return css`
          max-height: 24px;
        `;
      case SIZES.sm:
        return css`
          max-height: 32px;
        `;
      case SIZES.lg:
        return css`
          max-height: 48px;
        `;
      case SIZES.xl:
        return css`
          max-height: 56px;
        `;
      case SIZES.md:
      default:
        return css`
          max-height: 40px;
        `;
    }
  }}
`;
