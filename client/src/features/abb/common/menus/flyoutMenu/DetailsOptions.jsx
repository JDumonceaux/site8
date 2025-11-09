import React from "react";

import { msgFormatter } from "app/util";
import styled, { css } from "styled-components";

const positions = {
    center: "circle-center",
    left: "circle-left",
    right: "circle-right"
};

const DetailsOptions = ({
    active,
    onChange,
    path,
    position = "center",
    value
}) => {
    const handleViewChange = () => {
        onChange(value);
    };

    const icon = positions[position] || positions.center;

    return (
      <ItemDiv className={icon}>
        <OuterIconSpan $position={position} onClick={handleViewChange}>
          <InnerIconSpan $active={active} />
        </OuterIconSpan>
        <NameSpan $position={position}>{msgFormatter(path)()}</NameSpan>
      </ItemDiv>
    );
};

export default DetailsOptions;

const ItemDiv = styled.div`
    display: inline-block;
    width: 70px;
    vertical-align: top;
`;
const OuterIconSpan = styled.span`
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: 0 auto;
    cursor: pointer;
    margin-left: ${props => (props.$position === "left" ? "0" : null)};
    margin-right: ${props => (props.$position === "right" ? "0" : null)};
    ${props =>
        props.$position !== "right" &&
        css`
            &:after {
                content: "";
                position: absolute;
                width: 78px;
                height: 10px;
                top: 9px;
                left: 19px;
                display: inline-block;
                border-top: 1px solid #000000;
            }
        `}
`;
const InnerIconSpan = styled.span`
    display: ${({ $active }) => ($active ? "block" : "none")};
    position: absolute;
    width: 8px;
    height: 8px;
    background: #000000;
    border-radius: 50%;
    top: 5px;
    left: 5px;
`;

const NameSpan = styled.span`
    display: block;
    margin-top: 5px;
    text-align: ${({ $position }) => ($position ? $position : "left")};
    line-height: 16px;
`;
