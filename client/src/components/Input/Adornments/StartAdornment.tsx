import React, { memo } from 'react';
import { styled } from 'styled-components';

type StartAdornmentProps = {
  readonly children?: React.ReactNode | string | number | boolean;
};

const StartAdornment = ({ children }: StartAdornmentProps) => {
  if (!children) return null;

  const isString = (value) =>
    typeof value === 'string' || value instanceof String;
  const isNumber = (value) =>
    typeof value === 'number' || value instanceof Number;
  const isBoolean = (value) =>
    typeof value === 'boolean' || value instanceof Boolean;

  if (isString || isNumber || isBoolean) {
    return (
      <>
        <StyledDiv>{children}</StyledDiv>
        <StyledVLine />
      </>
    );
  }

  if (React.isValidElement(children)) {
    return (
      <>
        {children}
        <StyledVLine />
      </>
    );
  }
  throw new Error('Invalid type passed as child.');
};

StartAdornment.displayName = 'StartAdornment';

export default memo(StartAdornment);

const StyledDiv = styled.div`
  color: var(--input-adornment-color);
  margin-left: 8px;
  margin-right: 8px;
`;
const StyledVLine = styled.div`
  background-color: var(--input-adornment-color);
  width: 1px;
  height: 60%;
`;
