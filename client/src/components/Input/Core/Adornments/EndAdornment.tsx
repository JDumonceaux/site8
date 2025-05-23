import { memo, type FC, type ReactNode, type HTMLAttributes } from 'react';

import styled from 'styled-components';

export type EndAdornmentProps = {
  /** Content to render before the separator */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/** Renders an end adornment with a vertical separator */
export const EndAdornment: FC<EndAdornmentProps> = memo(
  ({ children, ...rest }: EndAdornmentProps) => {
    if (!children) return null;

    return (
      <>
        <Content {...rest}>{children}</Content>
        <Separator aria-hidden="true" />
      </>
    );
  },
);

EndAdornment.displayName = 'EndAdornment';
export default EndAdornment;

const Content = styled.div`
  color: var(--input-adornment);
  margin: 0 8px;
`;

const Separator = styled.div`
  background-color: var(--input-adornment);
  width: 1px;
  height: 60%;
`;
