import type { JSX } from 'react';

import styled from 'styled-components';
import type { FieldError } from '../../types';

export type FooterRowProps = {
  /** Validation errors for the field */
  errors?: FieldError[];
  /** Current length of the field value */
  fieldLength?: number;
  /** Maximum allowed length */
  maxLength?: number;
  /** Whether to display the length counter */
  showCounter?: boolean;
};

const FooterRow = ({
  errors,
  fieldLength = 0,
  maxLength = 0,
  showCounter = false,
}: FooterRowProps): JSX.Element => {
  const errorMessage = errors?.[0]?.message ?? null;

  return (
    <Row>
      <ErrorText>{errorMessage}</ErrorText>
      {showCounter && (
        <Counter>
          {fieldLength}/{maxLength}
        </Counter>
      )}
    </Row>
  );
};

FooterRow.displayName = 'FooterRow';
export default FooterRow;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 0.75rem;

  & > *:first-child {
    flex: 1;
  }
`;

const ErrorText = styled.div`
  color: var(--input-error-color, #b91c1c);
`;

const Counter = styled.div`
  color: var(--input-helper-font-color, #6b7280);
`;
