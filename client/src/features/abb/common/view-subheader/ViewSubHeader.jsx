import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const ViewSubHeader = ({ border = "normal", middleDiv, rightDiv, title }) => (
    <Container $border={border}>
        <Left>
            <Title>{title}</Title>
            {middleDiv}
        </Left>
        <Right>{rightDiv}</Right>
    </Container>
);

ViewSubHeader.propTypes = {
    border: PropTypes.oneOf(["normal", "bold"]),
    middleDiv: PropTypes.node,
    rightDiv: PropTypes.node,
    title: PropTypes.string
};

ViewSubHeader.displayName = "ViewSubHeader";
export default ViewSubHeader;

const Container = styled.div`
    background: white;
    width: 100%;
    border-bottom: ${({ $border }) =>
        $border === "bold"
            ? "2px solid black"
            : "1px solid rgb(202, 205, 208)"};
    column-gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    min-height: 50px;
    padding: 7px 32px;
    margin-bottom: 10px;
`;
const Left = styled.div`
    align-items: center;
    column-gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;
const Right = styled.div`
    align-items: center;
    column-gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const Title = styled.h1`
    color: #1f1f1f;
    font-size: 20px !important;
    font-family: abbvoice-regular, Verdana, sans-serif;
    margin: 0;
`;
