import { memo, type JSX, type ReactNode, type HTMLAttributes } from 'react';

import styled from 'styled-components';

export type EndAdornmentProps = HTMLAttributes<HTMLDivElement> & {
  /** Content to render before the separator */
  children?: ReactNode;
};

const EndAdornment = ({
  children,
  ...rest
}: EndAdornmentProps): JSX.Element | null => {
  if (!children) return null;

  return (
    <>
      <Content {...rest}>{children}</Content>
      <Separator aria-hidden="true" />
    </>
  );
};

EndAdornment.displayName = 'EndAdornment';
export default memo(EndAdornment);

const Content = styled.div`
  color: var(--input-adornment);
  margin: 0 8px;
`;

const Separator = styled.div`
  background-color: var(--input-adornment);
  width: 1px;
  height: 60%;
`;
