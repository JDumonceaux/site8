import type { JSX, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

/**
 * Props for the icon-only button.
 */
export type IconButtonProps = {
  /** Accessible label for screen readers */
  'aria-label': string;
  /** Icon or element to render inside the button */
  children: ReactNode;
  /** Color of the icon/content */
  color?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'type'>;

/**
 * Icon-only button with accessible label.
 *
 * Defined as a named function with explicit JSX.Element return type to avoid
 * the implicit `children` injection and baggage of `FC<>`.
 */
export function IconButton({
  'aria-label': ariaLabel,
  children,
  color = 'currentColor',
  ...rest
}: IconButtonProps): JSX.Element {
  return (
    <StyledButton $color={color} aria-label={ariaLabel} type="button" {...rest}>
      {children}
    </StyledButton>
  );
}

export default IconButton;

/* -- styled components -- */
const StyledButton = styled.button<{ $color: string }>`
  background: transparent;
  border: none;
  padding: 0.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  cursor: pointer;
  transition:
    background-color 150ms ease,
    transform 100ms ease;

  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring-color, #2684ff);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
