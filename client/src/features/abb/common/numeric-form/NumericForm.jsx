import React from 'react';

import GblAutoNumericInput from 'components/util/GblAutoNumericInput';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const NUMERICFORM_TYPE = {
  CURRENCY: 'currency',
  PERCENT: 'percent',
  PERCENT_NEG: 'percentNeg',
};

const NumericForm = ({
  label,
  required = false,
  type,
  vMax,
  vMin,
  ...props
}) => {
  let vMaxTemporary;
  let vMinTemporary;
  switch (type) {
    case NUMERICFORM_TYPE.CURRENCY: {
      vMaxTemporary = 99_999_999_999_999.99;
      break;
    }
    case NUMERICFORM_TYPE.PERCENT: {
      vMaxTemporary = 99.99;
      break;
    }
    case NUMERICFORM_TYPE.PERCENT_NEG: {
      vMaxTemporary = 99.99;
      vMinTemporary = -99.99;
      break;
    }
    default: {
      vMaxTemporary = 99_999_999_999_999.99;
      break;
    }
  }

  return (
    <StyledInput>
      {label ? (
        <StyledLabel htmlFor="inputForm">
          {label}
          {required ? <RequiredLabel> *</RequiredLabel> : null}
        </StyledLabel>
      ) : null}
      <GblAutoNumericInput
        id="inputForm"
        vMax={vMax || vMaxTemporary}
        vMin={vMin || vMinTemporary}
        {...props}
      />
    </StyledInput>
  );
};

NumericForm.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['currency', 'percent', 'percentNeg']),
  vMax: PropTypes.number,
  vMin: PropTypes.number,
};

export default NumericForm;

const RequiredLabel = styled.span`
  color: #f03040;
`;
const StyledLabel = styled.label`
  padding-left: 0px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 4px 4px 4px 0px !important;
`;
const StyledInput = styled.div`
  > input {
    color: #000000;
    border: 1px solid rgb(210, 210, 210);
    border-radius: 4px;
    text-align: right;
    width: 100%;
    height: 32px;
    padding-top: 3px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #fff;
  }
`;
