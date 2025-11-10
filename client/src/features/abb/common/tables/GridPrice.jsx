import React from 'react';
import { FormatCurrency } from 'react-globalize';

import styled from 'styled-components';
import { handleColorType } from '../StyleColorType';

const GridPrice = ({
  alignRight = false,
  children,
  currencyCode,
  disabled,
  hideZero = false,
  show = true,
}) => {
  if (!show || show === false) return null;
  if (hideZero === true && children === 0) return null;

  const tempCurrencyCode =
    currencyCode == null || currencyCode === '' ? 'USD' : currencyCode;

  return alignRight === true ? (
    <RightAlignedDiv>
      <StyledDiv
        $disabled={disabled}
        currency={tempCurrencyCode}
      >
        {children}
      </StyledDiv>
    </RightAlignedDiv>
  ) : (
    <StyledDiv
      $disabled={disabled}
      currency={tempCurrencyCode}
    >
      {children}
    </StyledDiv>
  );
};

export default GridPrice;

const StyledDiv = styled(FormatCurrency)`
  color: ${(props) =>
    props.$disabled === true ? handleColorType('disabled') : 'inherit'};
`;
const RightAlignedDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
