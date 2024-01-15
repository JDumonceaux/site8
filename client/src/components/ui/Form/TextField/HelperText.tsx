import React from "react";
import styled from "styled-components";

export interface IHelperTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledLabel = styled.div`
  color: black;
  background: white;
  height: 56px;
  display: block;
  border: 1px solid #888888;
  border-radius: 4px;
  & :hover {
    border-color: #a9a9a9;
  }
  & :focus {
    border-color: #696969;
  }
`;

export default function HelperText(props: IHelperTextProps) {
  return <StyledLabel {...props} />;
}
