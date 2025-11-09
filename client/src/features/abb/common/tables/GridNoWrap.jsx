import React from 'react';

import styled from 'styled-components';

const GridNoWrap = ({ children }) => {
  return <NoWrapDiv>{children}</NoWrapDiv>;
};

export default GridNoWrap;

const NoWrapDiv = styled.div`
  word-break: normal;
  overflow: hidden;
`;
