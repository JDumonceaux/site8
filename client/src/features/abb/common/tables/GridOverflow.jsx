import React from 'react';

import styled from 'styled-components';
import { handleColorType } from '../StyleColorType';

const GridOverflow = ({ children, disabled, maxWidth, text }) => {
  return (
    <OverflowDiv
      $disabled={disabled}
      $maxWidth={maxWidth}
      title={text}
    >
      {children ?? text}
    </OverflowDiv>
  );
};

export default GridOverflow;

const OverflowDiv = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: ${(props) =>
    props.$maxWidth ? `${props.$maxWidth}px` : undefined};
  color: ${(props) =>
    props.$disabled === true ? handleColorType('disabled') : 'inherit'};
`;
