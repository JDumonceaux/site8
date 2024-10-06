import React, { memo } from 'react';
import * as Form from '@radix-ui/react-form';
import { styled } from 'styled-components';

// Notes:  The minlength and maxlength constraints are only checked on
// user - provided input.
// They are not checked if a value is set programmatically,
// even when explicitly calling checkValidity() or reportValidity()

export type ValidityStateProps = {
  readonly errorMissing?: string;
  readonly errorType?: string;
};

const ValidityState = ({
  errorMissing,
  errorType,
}: ValidityStateProps): React.JSX.Element => (
  <>
    <StyledMessage match="badInput">{errorMissing}</StyledMessage>
    {/* This should be valid but doesn't seem to be working */}
    {/* <StyledMessage match="customError">{errorType}</StyledMessage> */}
    <StyledMessage match="patternMismatch">{errorType}</StyledMessage>
    <StyledMessage match="rangeOverflow">{errorType}</StyledMessage>
    <StyledMessage match="rangeUnderflow">{errorType}</StyledMessage>
    <StyledMessage match="stepMismatch">{errorType}</StyledMessage>
    <StyledMessage match="tooLong">{errorType}</StyledMessage>
    <StyledMessage match="tooShort">{errorType}</StyledMessage>
    <StyledMessage match="typeMismatch">{errorType}</StyledMessage>
    <StyledMessage match="valid">{errorMissing}</StyledMessage>
    <StyledMessage match="valueMissing">{errorMissing}</StyledMessage>
  </>
);

ValidityState.displayName = 'ValidityState';

export default memo(ValidityState);

const StyledMessage = styled(Form.Message)`
  color: var(--input-helper-error-color, '#ff0000');
  font-size: 0.8rem;
  opacity: 0.8;
  padding-top: 7px;
`;
