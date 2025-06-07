import type { JSX, ReactNode, HTMLAttributes } from 'react';

import styled from 'styled-components';

export type StartAdornmentProps = HTMLAttributes<HTMLDivElement> & {
  /** Content to render before the separator */
  children?: ReactNode;
};

const StartAdornment = ({
  children,
  ...rest
}: StartAdornmentProps): JSX.Element | null => {
  if (!children) return null;

  return (
    <>
      <AdornmentContent {...rest}>{children}</AdornmentContent>
      <SeparatorDiv aria-hidden="true" />
    </>
  );
};

StartAdornment.displayName = 'StartAdornment';
export default StartAdornment;

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
