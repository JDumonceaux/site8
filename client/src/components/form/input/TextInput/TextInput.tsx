import { InputHTMLAttributes } from 'react';

import { styled } from 'styled-components';
import { TextLabel } from '../TextLabel';
import { TextHelp } from '../TextHelp';

export type TextInputProps = {
  readonly id: string;
  readonly label: string;
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

// "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden"
// "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit"
// "tel" | "text" | "time" | "url" | "week"

export const TextInput = ({
  id,
  label,
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
    <StyledWrapper>
      <TextLabel errorText={errorTextShort} hasError={hasError} htmlFor={id}>
        {label}
      </TextLabel>
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
    </StyledWrapper>
  );
};

TextInput.displayName = 'TextInput';

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
const StyledWrapper = styled.div`
  margin-bottom: 18px;
`;
