import React, { memo } from 'react';
import { styled } from 'styled-components';

type InputHelpProps = {
  readonly children: React.ReactNode | string | string[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>;

const InputHelp = ({ children, ...rest }: InputHelpProps): JSX.Element => {
  if (!children) return null;

  const isString = (children) =>
    typeof children === 'string' || children instanceof String;
  const isNumber = (children) =>
    typeof children === 'number' || children instanceof Number;
  const isBoolean = (children) =>
    typeof children === 'boolean' || children instanceof Boolean;
  const isArray = Array.isArray(children);

  if (isString || isNumber || isBoolean) {
    return (
      <StyledDiv data-testid="input-help" {...rest}>
        {children}
      </StyledDiv>
    );
  }

  if (isArray) {
    if (children.length > 1) {
      return <StyledDiv data-testid="input-help" {...rest}></StyledDiv>;
    } else {
      return (
        <StyledDiv data-testid="input-help" {...rest}>
          <ul>
            {children.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`item-${index}`}>{item}</li>
            ))}
          </ul>
        </StyledDiv>
      );
    }
  }

  if (React.isValidElement(children)) {
    return <div {...rest}>{children}</div>;
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
