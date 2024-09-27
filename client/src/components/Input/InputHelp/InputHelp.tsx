import React, { memo } from 'react';
import { styled } from 'styled-components';

type InputHelpProps = {
  readonly helpText: React.ReactNode | string | string[];
  readonly children?: never;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'children'>;

const InputHelp = ({ helpText, ...rest }: InputHelpProps): JSX.Element => {
  if (!helpText) return null;

  const isString = (helpText) =>
    typeof helpText === 'string' || helpText instanceof String;
  const isNumber = (helpText) =>
    typeof helpText === 'number' || helpText instanceof Number;
  const isBoolean = (helpText) =>
    typeof helpText === 'boolean' || helpText instanceof Boolean;
  const isArray = Array.isArray(helpText);

  if (isString || isNumber || isBoolean) {
    return (
      <StyledDiv data-testid="input-help" {...rest}>
        {helpText}
      </StyledDiv>
    );
  }

  if (isArray) {
    if (helpText.length > 1) {
      return <StyledDiv data-testid="input-help" {...rest}></StyledDiv>;
    } else {
      return (
        <StyledDiv data-testid="input-help" {...rest}>
          <ul>
            {helpText.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`item-${index}`}>{item}</li>
            ))}
          </ul>
        </StyledDiv>
      );
    }
  }

  if (React.isValidElement(helpText)) {
    return <div {...rest}>{helpText}</div>;
  }
  throw new Error('Invalid type passed as child.');
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
    list-style-type: none;
  }
  .valid {
    color: green;
  }
  .valid:before {
    position: relative;
    left: -5px;
    content: '\\2713';
  }
  .invalid {
    color: red;
  }
  .invalid:before {
    position: relative;
    left: -5px;
    content: '\\0078';
  }
`;
