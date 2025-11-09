import React from 'react';

import styled from 'styled-components';
import { handleColorType } from '../StyleColorType';

const GridGeneral = ({ alignRight = false, disabled, show = true, value }) => {
  if (!show || show === false) return null;

  return alignRight === true ? (
    <RightAlignedDiv>
      <StyledDiv $disabled={disabled}>{value}</StyledDiv>
    </RightAlignedDiv>
  ) : (
    <StyledDiv $disabled={disabled}>{value}</StyledDiv>
  );
};

export default GridGeneral;

const StyledDiv = styled.div`
  color: ${(props) =>
    props.$disabled === true ? handleColorType('disabled') : 'inherit'};
`;
const RightAlignedDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
