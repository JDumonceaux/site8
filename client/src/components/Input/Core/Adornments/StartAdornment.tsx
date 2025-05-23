import { memo, type FC, type ReactNode, type HTMLAttributes } from 'react';

import styled from 'styled-components';

export type StartAdornmentProps = {
  /** Content to render before the separator */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Renders a leading adornment with a vertical separator.
 */
const StartAdornment: FC<StartAdornmentProps> = ({
  children,
  ...props
}: StartAdornmentProps) => {
  if (!children) return null;

  return (
    <>
      <AdornmentContent {...props}>{children}</AdornmentContent>
      <SeparatorDiv />
    </>
  );
};

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
