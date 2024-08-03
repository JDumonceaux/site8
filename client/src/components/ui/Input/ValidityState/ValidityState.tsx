import * as Form from '@radix-ui/react-form';
import { memo } from 'react';
import { styled } from 'styled-components';

export type ValidityStateProps = {
  readonly errorMissing?: string;
  readonly errorType?: string;
};

const ValidityState = ({
  errorMissing,
  errorType,
}: ValidityStateProps): JSX.Element => (
  <>
    <StyledMessage match="badInput">{errorMissing}</StyledMessage>
    {/* This should be valid */}
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
  color: var(---input-label-color, '#ffffff');
  font-size: 13px;
  opacity: 0.8;
`;
