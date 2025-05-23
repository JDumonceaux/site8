import { isValidElement, type FC, type ReactNode } from 'react';

import styled from 'styled-components';

export type InputHelpProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'id'
> & {
  /** Help text content: string, number, array of strings/nodes, or React element */
  readonly helpText?: ReactNode;
};

/**
 * Renders contextual help for an input, handling strings, arrays, and React elements.
 */
export const InputHelp: FC<InputHelpProps> = ({ helpText, ...rest }) => {
  if (!helpText) return null;

  // Primitive values: string, number, boolean
  if (
    typeof helpText === 'string' ||
    typeof helpText === 'number' ||
    typeof helpText === 'boolean'
  ) {
    return <StyledDiv {...rest}>{helpText}</StyledDiv>;
  }

  // Array of values: render as list if more than one item
  if (Array.isArray(helpText)) {
    return helpText.length > 1 ? (
      <StyledDiv {...rest}>
        <ul>
          {helpText.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </StyledDiv>
    ) : (
      <StyledDiv {...rest}>{helpText[0]}</StyledDiv>
    );
  }

  // React element
  if (isValidElement(helpText)) {
    return <StyledDiv {...rest}>{helpText}</StyledDiv>;
  }

  throw new Error('Invalid type passed as helpText.');
};

InputHelp.displayName = 'InputHelp';
export default InputHelp;

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
