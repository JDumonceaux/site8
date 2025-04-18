import { type LabelHTMLAttributes, isValidElement, useCallback } from 'react';

import styled from 'styled-components';

type TextHelpProps = {
  readonly characterCount?: number;
  readonly errorText?: React.ReactNode | string | string[];
  readonly hasError?: boolean;
  readonly helpText?: React.ReactNode | string | string[];
  readonly maxLength?: number;
  readonly showCounter?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

const TextHelp = ({
  characterCount,
  errorText,
  hasError = true,
  helpText,
  maxLength,
  showCounter = false,
}: TextHelpProps): React.JSX.Element => {
  const getHelperText = useCallback(
    (msg: React.ReactNode | string | string[] | undefined) => {
      if (!msg) return null;
      if (isValidElement(msg)) return msg;
      if (!Array.isArray(msg)) return <div>{msg}</div>;

      if (msg.length > 1) {
        return (
          <ul>
            {msg.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`item-${index}`}>{item}</li>
            ))}
          </ul>
        );
      }
      return <div>{msg[0]}</div>;
    },
    [],
  );

  const getCounterText = useCallback(
    (
      helperTextCharacterCount: number | undefined,
      helperTextMaxLength: number | undefined,
      helperTextShowCounter: boolean,
    ) => {
      return helperTextShowCounter ? (
        <div>
          {helperTextCharacterCount ?? 0}/{helperTextMaxLength ?? 0}
        </div>
      ) : null;
    },
    [],
  );

  return (
    <StyledDivWrapper>
      <StyledErrorDiv $hasError={hasError}>
        {getHelperText(hasError ? helpText : errorText)}
      </StyledErrorDiv>
      {getCounterText(characterCount, maxLength, showCounter)}
    </StyledDivWrapper>
  );
};

TextHelp.displayName = 'TextHelp';

export default TextHelp;

const StyledDivWrapper = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 6px;
  ul {
    margin-block-start: 0;
    padding-inline-start: 15px;
  }
`;
const StyledErrorDiv = styled.div<{ $hasError: boolean }>`
  color: ${(props) => (props.$hasError ? '#212121' : '#ff0000')};
`;
