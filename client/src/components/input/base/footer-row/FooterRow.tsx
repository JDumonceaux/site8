import { type JSX, memo, type ReactNode } from 'react';

import type { FieldError } from '@types';
import styled from 'styled-components';

type FieldMessages = {
  readonly error?: string;
  readonly info?: string;
  readonly warning?: string;
};

export type FooterRowProps = {
  /** Validation errors for the field */
  errors?: FieldError[];
  /** Current length of the field value */
  fieldLength?: number;
  /** Optional element shown at the end of the footer row */
  footerEndAdornment?: ReactNode;
  /** Whether to display the length counter */
  isShowCounter?: boolean;
  /** Maximum allowed length */
  maxLength?: number;
  /** Optional contextual messages shown below the field */
  messages?: FieldMessages;
};

const FooterRow = memo(
  ({
    errors,
    fieldLength = 0,
    footerEndAdornment,
    isShowCounter = false,
    maxLength = 0,
    messages,
  }: FooterRowProps): JSX.Element => {
    const errorMessage = errors?.[0]?.message ?? messages?.error ?? null;
    const warningMessage = errorMessage ? null : (messages?.warning ?? null);
    const infoMessage =
      errorMessage || warningMessage ? null : (messages?.info ?? null);
    const footerMessage = errorMessage ?? warningMessage ?? infoMessage;
    let messageTone: 'error' | 'info' | 'warning' = 'info';
    if (errorMessage) {
      messageTone = 'error';
    } else if (warningMessage) {
      messageTone = 'warning';
    }

    return (
      <Row>
        <MessageText $tone={messageTone}>{footerMessage}</MessageText>
        <EndContent>
          {isShowCounter ? (
            <Counter>{`${fieldLength}/${maxLength}`}</Counter>
          ) : null}
          {footerEndAdornment ? (
            <FooterEndAdornment>{footerEndAdornment}</FooterEndAdornment>
          ) : null}
        </EndContent>
      </Row>
    );
  },
);

FooterRow.displayName = 'FooterRow';
export default FooterRow;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 1.25rem;
  padding: 0.375rem 0 0;
  font-size: 0.75rem;
  gap: 0.5rem;

  & > *:first-child {
    flex: 1;
  }
`;

const MessageText = styled.div<{ $tone: 'error' | 'info' | 'warning' }>`
  color: ${({ $tone }) => {
    if ($tone === 'error') {
      return 'var(--input-error-color, #b91c1c)';
    }

    if ($tone === 'warning') {
      return 'var(--status-warning)';
    }

    return 'var(--input-helper-font-color, #6b7280)';
  }};
`;

const Counter = styled.div`
  color: var(--input-helper-font-color, #6b7280);
`;

const EndContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const FooterEndAdornment = styled.div`
  display: inline-flex;
  align-items: center;
`;
