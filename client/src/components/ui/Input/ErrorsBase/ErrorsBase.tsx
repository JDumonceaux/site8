import * as Form from '@radix-ui/react-form';
import { memo } from 'react';
import { styled } from 'styled-components';

export type ErrorsBaseProps = {
  readonly errorMissing?: string;
  readonly errorType?: string;
};

const ErrorsBase = ({
  errorMissing,
  errorType,
}: ErrorsBaseProps): JSX.Element => (
  <>
    <StyledMessage match="valueMissing">{errorMissing}</StyledMessage>
    <StyledMessage match="typeMismatch">{errorType}</StyledMessage>
    <StyledMessage match="patternMismatch">{errorType}</StyledMessage>
    <StyledMessage match="rangeUnderflow">{errorType}</StyledMessage>
    <StyledMessage match="rangeOverflow">{errorType}</StyledMessage>
    <StyledMessage match="stepMismatch">{errorType}</StyledMessage>
    <StyledMessage match="tooShort">{errorType}</StyledMessage>
    <StyledMessage match="tooLong">{errorType}</StyledMessage>
  </>
);

ErrorsBase.displayName = 'ErrorsBase';

export default memo(ErrorsBase);

const StyledMessage = styled(Form.Message)`
  color: var(---input-label-color, '#ffffff');
  font-size: 13px;
  opacity: 0.8;
`;
