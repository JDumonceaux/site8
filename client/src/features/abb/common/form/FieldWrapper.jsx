import React from "react";

import styled from "styled-components";

const FieldWrapper = ({ children, required = false, size = "regular" }) => {
    return (
      <InputFormContainer required={required} size={size}>
        {children}
      </InputFormContainer>
    );
};

export default FieldWrapper;

const InputFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
    width: auto;
    min-width: 130px;
    .regular {
        height: 32px;
    }
    .small {
        height: 24px;
    }
`;
