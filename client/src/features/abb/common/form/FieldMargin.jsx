import React from "react";

import styled from "styled-components";

const FieldMargin = ({ children, margin }) => {
    return (
      <ContainerDiv $margin={margin}>
        {children}
      </ContainerDiv>
    );
};

export default FieldMargin;

const ContainerDiv = styled.div`
   margin-bottom: ${props => props.$margin || "0px"};
`;
