import React, { memo, useCallback } from 'react';
import { styled } from 'styled-components';

type InputHelpProps = {
  readonly helpText?: React.ReactNode | string | string[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>;

const InputHelp = ({ helpText }: InputHelpProps): JSX.Element => {
  const getHelperText = useCallback(
    (msg: React.ReactNode | string | string[] | undefined) => {
      if (!msg) return null;
      if (React.isValidElement(msg)) return msg;
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
      } else {
        return <div>{msg[0]}</div>;
      }
    },
    [],
  );

  return (
    <StyledDiv data-testid="input-help">{getHelperText(helpText)}</StyledDiv>
  );
};

InputHelp.displayName = 'InputHelp';

export default memo(InputHelp);
export type { InputHelpProps };

const StyledDiv = styled.div`
  font-size: var(--input-helper-font-size, 0.75rem);
  color: var(--input-helper-font-color, #000000);
  margin-top: 4px;
  margin-bottom: 6px;
  ul {
    margin-block-start: 0;
    padding-inline-start: 15px;
  }
`;
