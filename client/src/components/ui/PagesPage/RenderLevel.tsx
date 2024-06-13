'use client';
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
  ) : (
    <StyledTd3>{children}</StyledTd3>
  );
};

export default RenderLevel;

const StyledTd1 = styled.td`
  padding-left: 0px;
`;
const StyledTd2 = styled.td`
  padding-left: 30px;
`;
const StyledTd3 = styled.td`
  padding-left: 60px;
`;
