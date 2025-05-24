import type { JSX } from 'react';
import * as Form from '@radix-ui/react-form';
import styled from 'styled-components';

// Notes: The minlength and maxlength constraints are only checked on
// user-provided input.
// They are not checked if a value is set programmatically,
// even when explicitly calling checkValidity() or reportValidity()
export type ValidityStateProps = {
  readonly errorMissing?: string;
  readonly errorType?: string;
};

/**
 * Renders Radix Form.Messages for various validity states.
 */
function ValidityState({
  errorMissing,
  errorType,
}: ValidityStateProps): JSX.Element | null {
  // If neither message is provided, render nothing
  if (!errorMissing && !errorType) return null;

  // Group the validity matches by which message they should show
  const missingMatches: Form.MessageMatch[] = [
    'valueMissing',
    'badInput',
    'valid',
  ];
  const typeMatches: Form.MessageMatch[] = [
    'patternMismatch',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'tooLong',
    'tooShort',
    'typeMismatch',
  ];

  return (
    <>
      {missingMatches.map((match) => (
        <StyledMessage key={match} match={match}>
          {errorMissing}
        </StyledMessage>
      ))}
      {typeMatches.map((match) => (
        <StyledMessage key={match} match={match}>
          {errorType}
        </StyledMessage>
      ))}
    </>
  );
}

ValidityState.displayName = 'ValidityState';
export default ValidityState;

const StyledMessage = styled(Form.Message)`
  color: var(--input-helper-error-color, #ff0000);
  font-size: 0.8rem;
  opacity: 0.8;
  padding-top: 7px;
`;
