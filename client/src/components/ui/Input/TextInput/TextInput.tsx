import { InputHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

import { TextHelp } from '../TextHelp/TextHelp';

export type TextInputProps = {
  readonly characterCount?: number;
  readonly errorText?: React.ReactNode | string | string[];
  readonly errorTextShort?: string;
  readonly helpText?: React.ReactNode | string | string[];
  readonly id: string;
  readonly label?: string;
  readonly layout?: 'horizontal' | 'vertical';
  readonly maxLength?: number;
  readonly outerEndComponent?: React.ReactNode;
  readonly required?: boolean;
  readonly showCounter?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>;

// Input Types:
// "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden"
// "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit"
// "tel" | "text" | "time" | "url" | "week"
// ToDo: Create components for additional input types
// ToDo: Remove attributes that are not valid for this input type

const TextInput = ({
  errorText,
  helpText,
  id,
  layout = 'vertical',
  maxLength,
  outerEndComponent,
  required = false,
  showCounter = false,
  type = 'text',
  value,
  ...rest
}: TextInputProps): JSX.Element => {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <StyledWrapper $layout={layout}>
      <StyledFlexGrow>
        <StyledDivWrapper>
          <StyledInput
            aria-required={required}
            id={id}
            maxLength={maxLength}
            name={id}
            required={required}
            type={type}
            value={value}
            {...rest}
          />
          {outerEndComponent}
        </StyledDivWrapper>
        <TextHelp
          characterCount={characterCount}
          errorText={errorText}
          helpText={helpText}
          maxLength={maxLength}
          showCounter={showCounter}
        />
      </StyledFlexGrow>
    </StyledWrapper>
  );
};

TextInput.displayName = 'TextInput';

export default memo(TextInput);

const StyledWrapper = styled.div<{ $layout: string }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.$layout === 'vertical' ? 'column' : 'row'};
  label:first-child {
    flex-basis: 200px;
  }
`;
const StyledFlexGrow = styled.div`
  flex-grow: 1;
`;
const StyledInput = styled.input`
  position: relative;
  background-color: inherit;
  font-size: 1rem;
  letter-spacing: 0.5px;
  line-height: 20px;
  padding-block-end: 6px;
  padding-block-start: 6px;
  padding-inline-end: 6px;
  padding-inline-start: 6px;
  &::placeholder {
    font-size: 0.8rem;
  }
`;
const StyledDivWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;

  background-color: #ffffff;
  padding: 0 6px;
  border-width: 1px;
  border-style: solid;

  border-radius: 4px;
  &:hover {
    border-color: #63544f;
  }
`;
