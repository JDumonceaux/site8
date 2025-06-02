import type { ReactNode, ButtonHTMLAttributes, JSX } from 'react';

import styled from 'styled-components';

export type StyledPlainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Button content */
  children?: ReactNode;
};

/** A plain button styled as a link */
export const StyledPlainButton = ({
  children,
  ...rest
}: StyledPlainButtonProps): JSX.Element | null => (
  <StyledButton {...rest}>{children}</StyledButton>
);

StyledPlainButton.displayName = 'StyledPlainButton';

const StyledButton = styled.button`
  display: inline-block;
  color: var(--palette-text);

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--palette-text);
  }

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
