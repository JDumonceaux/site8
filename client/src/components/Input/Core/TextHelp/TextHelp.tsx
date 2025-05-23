import { type FC, type LabelHTMLAttributes, isValidElement } from 'react';

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

const renderHelper = (msg?: React.ReactNode | string | string[]) => {
  if (!msg) return null;
  if (isValidElement(msg)) return msg;

  if (Array.isArray(msg)) {
    if (msg.length > 1) {
      return (
        <ul>
          {msg.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    return <div>{msg[0]}</div>;
  }

  // string, number, boolean
  return <div>{msg}</div>;
};

/**
 * Displays contextual help or error text, with an optional character counter.
 */
export const TextHelp: FC<TextHelpProps> = ({
  characterCount = 0,
  errorText,
  hasError = true,
  helpText,
  maxLength = 0,
  showCounter = false,
  ...rest
}) => {
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
