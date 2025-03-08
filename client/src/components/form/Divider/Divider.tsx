import { memo } from 'react';

import { styled } from 'styled-components';

type DividerProps = {
  readonly children: React.ReactNode;
};

const Divider = ({ children }: DividerProps): React.JSX.Element => {
  return (
    <StyledDiv>
      <StyledLine />
      <StyledChildren>{children}</StyledChildren>
      <StyledLine />
    </StyledDiv>
  );
};

Divider.displayName = 'Divider';

export default memo(Divider);

const StyledDiv = styled.div`
  display: flex;
  min-height: 20px;
  align-items: center;
  justify-content: space-between;
`;
const StyledLine = styled.div`
  border: solid #727272;
  border-width: 1px 0 0;
  line-height: 20px;
  width: 100%;
`;
const StyledChildren = styled.div`
  padding: 0 10px;
`;
