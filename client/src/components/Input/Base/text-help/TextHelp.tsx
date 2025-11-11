import type { JSX, LabelHTMLAttributes } from 'react';
import { isValidElement } from 'react';

import styled from 'styled-components';

export type TextHelpProps = LabelHTMLAttributes<HTMLDivElement> & {
  /** Current character count */
  characterCount?: number;
  /** Text to show when there is an error */
  errorText?: React.ReactNode | string | string[];
  /** Whether to display the errorText (true) or helpText (false) */
  hasError?: boolean;
  /** Text to show when there is no error */
  helpText?: React.ReactNode | string | string[];
  /** Maximum allowed length */
  maxLength?: number;
  /** Whether to display the length counter */
  showCounter?: boolean;
};

const renderHelper = (message?: React.ReactNode | string | string[]) => {
  if (!message) return null;
  if (isValidElement(message)) return message;

  if (Array.isArray(message)) {
    if (message.length > 1) {
      return (
        <ul>
          {message.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <div>{message[0]}</div>;
  }

  // string, number, boolean
  return <div>{message}</div>;
};

/**
 * Displays contextual help or error text, with an optional character counter.
 */
const TextHelp = ({
  characterCount = 0,
  errorText,
  hasError = true,
  helpText,
  maxLength = 0,
  showCounter = false,
  ...rest
}: TextHelpProps): JSX.Element | null => {
  const content = hasError ? helpText : errorText;

  return (
    <Wrapper {...rest}>
      <Message $hasError={hasError}>{renderHelper(content)}</Message>
      {showCounter ? (
        <Counter>
          {characterCount}/{maxLength}
        </Counter>
      ) : null}
    </Wrapper>
  );
};

TextHelp.displayName = 'TextHelp';
export default TextHelp;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.75rem;
  margin: 4px 0 6px;
  ul {
    margin-block-start: 0;
    padding-inline-start: 15px;
  }
`;

const Message = styled.div<{ $hasError: boolean }>`
  color: ${({ $hasError }) =>
    $hasError ? 'var(--input-helper-font-color, #000)' : '#ff0000'};
  flex: 1;
`;

const Counter = styled.div`
  margin-left: 1rem;
  color: var(--input-helper-font-color, #000);
`;
