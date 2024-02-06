import React from 'react';
import styled from 'styled-components';

export interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledDiv = styled.div`
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

const StyledInput = styled.input`
  color: black;
  background: white;
  font-size: 16px;
  line-height: 20px;
  height: 54px;
  margin-left: 1px;
  margin-right: 16px;
  display: block;
  padding-right: 16px;
  padding-left: 16px;
  border: unset;
`;

export default function TextInput(props: ITextInputProps) {
  return (
    <StyledDiv>
      <StyledInput {...props} />
    </StyledDiv>
  );
}
