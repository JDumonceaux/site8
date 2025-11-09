import React from "react";

import GblAutoNumericInput from "components/util/GblAutoNumericInput";
import styled from "styled-components";
import FieldLabel from "./FieldLabel";
import FieldMargin from "./FieldMargin";
import FieldMessages from "./FieldMessages";
import FieldWrapper from "./FieldWrapper";

const NumberForm = ({
    disabled = false,
    errorMessage,
    extra,
    id,
    label,
    labelProps,
    margin,
    required = false,
    ...rest
}) => {
    const handleSearch = () => {
        if (!disabled) {
            handleSearch();
        }
    };

    return (
      <FieldMargin margin={margin}>
        <FieldWrapper required={required}>
          <FieldLabel
            id={id}
            label={label}
            required={required}
            {...labelProps}
            extra={extra}
          />
          <InputWrapper>
            <GblAutoNumericInput id={id} {...rest} />
          </InputWrapper>
          <FieldMessages errorMessage={errorMessage} />
        </FieldWrapper>
      </FieldMargin>
    );
};

export default NumberForm;

const InputWrapper = styled.div`
    display: inline-flex;
    position: relative;
`;
