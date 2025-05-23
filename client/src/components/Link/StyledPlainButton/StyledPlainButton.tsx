import {
  type FC,
  type ReactNode,
  type ButtonHTMLAttributes,
  memo,
} from 'react';

import styled from 'styled-components';

export type StyledPlainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Button content */
  children?: ReactNode;
};

/** A plain button styled as a link */
const StyledPlainButton: FC<StyledPlainButtonProps> = ({
  children,
  ...rest
}) => <StyledButton {...rest}>{children}</StyledButton>;

StyledPlainButton.displayName = 'StyledPlainButton';
export default memo(StyledPlainButton);

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
  }
`;
