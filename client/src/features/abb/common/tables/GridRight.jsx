import React from 'react';

import styled from 'styled-components';

const GridRight = ({ children }) => {
  return <RightAlignedDiv>{children}</RightAlignedDiv>;
};

export default GridRight;

const RightAlignedDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
