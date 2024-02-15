import React, { LabelHTMLAttributes, useCallback } from 'react';
import { styled } from 'styled-components';

type TextHelpProps = {
  readonly children?: React.ReactNode | string | string[];
  readonly isValid?: boolean;
  readonly showCounter?: boolean;
  readonly characterCount?: number;
  readonly maxLength?: number;
} & LabelHTMLAttributes<HTMLLabelElement>;

const StyledDivWrapper = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px;
`;

export function TextHelp({
  children,
  showCounter = false,
  characterCount,
  maxLength,
  ...rest
}: TextHelpProps): JSX.Element {
  const getHelperText = useCallback(
    (msg: React.ReactNode | string[] | string | undefined) => {
      if (!msg) return null;
      if (React.isValidElement(msg)) return msg;
      if (!Array.isArray(msg)) return <div>{msg}</div>;

      if (msg.length > 1) {
        return (
          <div>
            <ul>
              {msg.map(function (item, index) {
                return <li key={index}>{item}</li>;
              })}
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
      <div>{getHelperText(children)}</div>
      {getCounterText(characterCount, maxLength, showCounter)}
    </StyledDivWrapper>
  );
}
