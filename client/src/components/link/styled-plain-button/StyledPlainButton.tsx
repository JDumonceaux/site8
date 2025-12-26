import type { ButtonHTMLAttributes, JSX, ReactNode, Ref } from 'react';

import styled from 'styled-components';

export type StyledPlainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Button content */
  readonly children?: ReactNode;
  /** Ref to the button element */
  readonly ref?: Ref<HTMLButtonElement>;
};

/** A plain button styled as a link */
const StyledPlainButton = ({
  children,
  ref,
  ...rest
}: StyledPlainButtonProps): JSX.Element => (
  <StyledButton
    ref={ref}
    {...rest}
  >
    {children}
  </StyledButton>
);

StyledPlainButton.displayName = 'StyledPlainButton';
export default StyledPlainButton;

const COLOR_TEXT = 'var(--palette-text)';
const COLOR_LINK_HOVER = 'var(--palette-text)';
const OUTLINE_COLOR = 'var(--palette-black)';

const StyledButton = styled.button`
  display: inline-block;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  font: inherit;
  color: ${COLOR_TEXT};
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${COLOR_LINK_HOVER};
    text-decoration: underline;
    text-underline-position: under;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
