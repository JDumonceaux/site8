import React from 'react';
import { FormatCurrency } from 'react-globalize';

import PropTypes from 'prop-types';
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

GridPrice.propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.node,
  currencyCode: PropTypes.string,
  disabled: PropTypes.bool,
  hideZero: PropTypes.bool,
  show: PropTypes.bool,
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
