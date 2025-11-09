import React from "react";

import styled from "styled-components";

const SectionTitle = ({ children }) => {
    return <StyledDiv>{children}</StyledDiv>;
};

export default SectionTitle;

const StyledDiv = styled.div`
    font-size: 18px;
    border-bottom: 1px solid rgb(202, 205, 208);
    padding: 0px 0px 5px;
    margin-bottom: 10px;
`;
