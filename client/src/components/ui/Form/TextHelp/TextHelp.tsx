import React, { LabelHTMLAttributes, useCallback } from 'react';
import { styled } from 'styled-components';

type TextHelpProps = {
  readonly isValid?: boolean;
  readonly showCounter?: boolean;
  readonly characterCount?: number;
  readonly maxLength?: number;
  readonly helpText?: React.ReactNode | string | string[];
  readonly errorText?: React.ReactNode | string[] | string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const TextHelp = ({
  isValid = true,
  showCounter = false,
  characterCount,
  maxLength,
  helpText,
  errorText,
}: TextHelpProps): JSX.Element => {
  const getHelperText = useCallback(
    (msg: React.ReactNode | string[] | string | undefined) => {
      if (!msg) return null;
      if (React.isValidElement(msg)) return msg;
      if (!Array.isArray(msg)) return <div>{msg}</div>;

      if (msg.length > 1) {
        return (
          <div>
            <ul>
              {msg.map((item, index) => (
                <li key={`item-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        return <div>{msg[0]}</div>;
      }
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
          {helperTextCharacterCount ? helperTextCharacterCount : 0}/
          {helperTextMaxLength ? helperTextMaxLength : 0}
        </div>
      ) : null;
    },
    [],
  );

  return (
    <StyledDivWrapper>
      <StyledErrorDiv $isValid={isValid}>
        {getHelperText(isValid ? helpText : errorText)}
      </StyledErrorDiv>
      {getCounterText(characterCount, maxLength, showCounter)}
    </StyledDivWrapper>
  );
};

const StyledDivWrapper = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 6px;
`;
const StyledErrorDiv = styled.div<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
`;
