import { InputHTMLAttributes, memo } from 'react';

import { styled } from 'styled-components';
import { TextHelp } from '../TextHelp/TextHelp';
import { TextLabel } from '../TextLabel/TextLabel';

export type TextInputProps = {
  readonly id: string;
  readonly label?: string;
  readonly layout?: 'horizontal' | 'vertical';
  readonly showCounter?: boolean;
  readonly characterCount?: number;
  readonly maxLength?: number;
  readonly hasError?: boolean;
  readonly required?: boolean;
  readonly helpText?: React.ReactNode | string[] | string;
  readonly errorTextShort?: string;
  readonly errorText?: React.ReactNode | string[] | string;
  readonly outerEndComponent?: React.ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>;

// Input Types:
// "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden"
// "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit"
// "tel" | "text" | "time" | "url" | "week"
// ToDo: Create components for additional input types
// ToDo: Remove attributes that are not valid for this input type

const TextInput = ({
  id,
  label,
  layout = 'vertical',
  showCounter = false,
  maxLength,
  hasError = true,
  required = false,
  helpText,
  errorText,
  errorTextShort,
  value,
  outerEndComponent,
  type = 'text',
  ...rest
}: TextInputProps): JSX.Element => {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <StyledWrapper $layout={layout}>
      {label ? (
        <TextLabel errorText={errorTextShort} hasError={hasError} htmlFor={id}>
          {label}
        </TextLabel>
      ) : null}
      <StyledFlexGrow>
        <StyledDivWrapper $hasError={hasError}>
          <StyledInput
            $hasError={hasError}
            aria-invalid={!hasError}
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
          hasError={hasError}
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
const StyledInput = styled.input<{ $hasError: boolean }>`
  position: relative;
  color: ${(props) => (props.$hasError ? '#212121' : '#ff0000')};
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
const StyledDivWrapper = styled.div<{ $hasError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  color: ${(props) => (props.$hasError ? '#212121' : '#ff0000')};
  background-color: #ffffff;
  padding: 0 6px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.$hasError ? 'rgba(0, 0, 0, 0.23)' : '#ff0000'};
  border-radius: 4px;
  &:hover {
    border-color: #63544f;
  }
  &:focus {
    border-color: ${(props) => (props.$hasError ? '#6db144;' : '#ff0000')};
    border-width: 2px;
  }
`;
