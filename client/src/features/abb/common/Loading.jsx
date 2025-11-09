import React, { memo } from 'react';

import styled from 'styled-components';

const Loading = memo(({ title }) => {
  return (
    <WrapperDiv>
      <TitleDiv>{title}</TitleDiv>
    </WrapperDiv>
  );
});

Loading.displayName = 'Loading';

export default Loading;

const WrapperDiv = styled.div`
  border: 1px solid #d2d2d2;
  border-top: none;
  padding: 20px;
  margin: 0px 32px;
`;
const TitleDiv = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
