import { memo, isValidElement } from 'react';

import { styled } from 'styled-components';

type InputHelpProps = {
  readonly children?: never;
  readonly helpText?: React.ReactNode | string | string[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'id'>;

const InputHelp = ({ helpText, ...rest }: InputHelpProps): React.ReactNode => {
  if (!helpText) return null;

  const isString = typeof helpText === 'string' || helpText instanceof String;
  const isNumber = typeof helpText === 'number' || helpText instanceof Number;
  const isBoolean =
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
      return <StyledDiv data-testid="input-help" {...rest} />;
    }
    return (
      <StyledDiv data-testid="input-help" {...rest}>
        <ul>
          {helpText.map((item, index) => (
            <li key={`item-${index}`}>{item}</li>
          ))}
        </ul>
      </StyledDiv>
    );
  }

  if (isValidElement(helpText)) {
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
