import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

export type StyledPlainButtonProps = {
  readonly children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const StyledPlainButton = ({
  children,
  ...rest
}: StyledPlainButtonProps): JSX.Element => (
  <StyledElement {...rest}>{children}</StyledElement>
);

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
