import type { HTMLAttributes, JSX, ReactNode, Ref } from 'react';

import styled from 'styled-components';

export type EndAdornmentProps = HTMLAttributes<HTMLDivElement> & {
  readonly children?: ReactNode;
  readonly ref?: Ref<HTMLDivElement>;
};

const EndAdornment = ({
  children,
  ref,
  ...rest
}: EndAdornmentProps): JSX.Element | null => {
  if (!children) return null;

  return (
    <Wrapper
      ref={ref}
      {...rest}
    >
      <Content>{children}</Content>
      <Separator aria-hidden="true" />
    </Wrapper>
  );
};

EndAdornment.displayName = 'EndAdornment';
export default EndAdornment;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  color: var(--input-adornment);
  margin: 0 0.625rem;
`;

const Separator = styled.div`
  background-color: var(--input-adornment);
  width: 1px;
  height: 60%;
`;
