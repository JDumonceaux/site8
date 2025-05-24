import { memo, type JSX, type ReactNode, type HTMLAttributes } from 'react';

import styled from 'styled-components';

/**
 * Renders a leading adornment with a vertical separator.
 */
export type StartAdornmentProps = HTMLAttributes<HTMLDivElement> & {
  /** Content to render before the separator */
  children?: ReactNode;
};

function StartAdornment({
  children,
  ...props
}: StartAdornmentProps): JSX.Element | null {
  if (!children) return null;

  return (
    <>
      <AdornmentContent {...props}>{children}</AdornmentContent>
      <SeparatorDiv aria-hidden="true" />
    </>
  );
}

StartAdornment.displayName = 'StartAdornment';
export default memo(StartAdornment);

const AdornmentContent = styled.div`
  color: var(--input-adornment-color);
  margin: 0 8px;
  user-select: none;
`;

const SeparatorDiv = styled.div`
  width: 1px;
  height: 18px;
  background-color: var(--input-adornment-color);
  user-select: none;
`;
