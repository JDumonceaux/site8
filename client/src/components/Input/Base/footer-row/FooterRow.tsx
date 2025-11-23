import type { JSX } from 'react';

import type { FieldError } from '@shared/types/FieldError';
import styled from 'styled-components';

export type FooterRowProps = {
  /** Validation errors for the field */
  errors?: FieldError[];
  /** Current length of the field value */
  fieldLength?: number;
  /** Whether to display the length counter */
  isShowCounter?: boolean;
  /** Maximum allowed length */
  maxLength?: number;
};

const FooterRow = ({
  errors,
  fieldLength = 0,
  isShowCounter = false,
  maxLength = 0,
}: FooterRowProps): JSX.Element => {
  const errorMessage = errors?.[0]?.message ?? null;

  return (
    <Row>
      <ErrorText>{errorMessage}</ErrorText>
      {isShowCounter ? (
        <Counter>{`${fieldLength}/${maxLength}`}</Counter>
      ) : null}
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
