import React from "react";

import { msgFormatter } from "app/util";
import styled from "styled-components";

const FieldLabel = ({
    endAdornment,
    id,
    label,
    labelProps,
    path,
    required = false,
    startAdornment
}) => {
    const displayLabel = label || (path ? msgFormatter(path)() : "");

    return (
      <StyledLabel htmlFor={id} {...labelProps}>
        <div>
          {startAdornment}
          {displayLabel}
          {required ? <RequiredLabel>*</RequiredLabel> : null}
        </div>
        <div>{endAdornment}</div>
      </StyledLabel>
    );
};

export default FieldLabel;

const StyledLabel = styled.label`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    padding-left: 0px;
    font-size: 14px;
    font-weight: 500;
    max-width: 100%;
    -webkit-box-align: center;
    margin: 4px 4px 4px 0px !important;
`;
const RequiredLabel = styled.span`
    color: #f03040;
    margin-left: 2px;
`;
