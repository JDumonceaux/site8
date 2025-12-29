import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react';

import styled from 'styled-components';

export type IconButtonProps = {
  /** Accessible label for screen readers */
  'aria-label': string;
  /** Icon or element to render inside the button */
  children: ReactNode;
  /** Color of the icon/content */
  color?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'type'>;

const IconButton = ({
  'aria-label': ariaLabel,
  children,
  color = 'currentColor',
  ...rest
}: IconButtonProps): JSX.Element => {
  return (
    <StyledButton
      aria-label={ariaLabel}
      type="button"
      $color={color}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

IconButton.displayName = 'IconButton';
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
    background-color: var(--hover-background);
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
