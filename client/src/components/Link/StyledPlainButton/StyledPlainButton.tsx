import React, { memo } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { styled } from 'styled-components';

type StyledPlainButtonProps = {
  readonly children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledPlainButton = memo(
  ({ children, ...rest }: StyledPlainButtonProps): React.JSX.Element => (
    <StyledElement {...rest}>{children}</StyledElement>
  ),
);

export default StyledPlainButton;

const StyledElement = styled.button`
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
  }
`;
