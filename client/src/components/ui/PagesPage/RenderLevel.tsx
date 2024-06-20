import React from 'react';
import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
  readonly level: number;
};

export const RenderLevel = ({ level, children }: Props): JSX.Element | null => {
  return level === 0 ? (
    <StyledTd1>{children}</StyledTd1>
  ) : level === 1 ? (
    <StyledTd2>{children}</StyledTd2>
  ) : level === 2 ? (
    <StyledTd3>{children}</StyledTd3>
  ) : (
    <StyledTd4>{children}</StyledTd4>
  );
};

export default RenderLevel;

const StyledTd1 = styled.td`
  padding-left: 0px;
`;
const StyledTd2 = styled.td`
  a {
    padding-left: 30px;
  }
`;
const StyledTd3 = styled.td`
  a {
    padding-left: 60px;
  }
`;
const StyledTd4 = styled.td`
  a {
    padding-left: 90px;
  }
`;
