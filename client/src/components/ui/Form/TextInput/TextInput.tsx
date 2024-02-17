import { TextLabel } from '../TextLabel';
import { styled } from 'styled-components';

import { InputHTMLAttributes } from 'react';
import { TextHelp } from '../TextHelp';

type TextInputProps = {
  readonly id: string;
  readonly label: string;
  readonly showCounter?: boolean;
  readonly characterCount?: number;
  readonly maxLength?: number;
  readonly isValid?: boolean;
  readonly isRequired?: boolean;
  readonly helpText?: React.ReactNode | string[] | string;
  readonly errorTextShort?: string;
  readonly errorText?: React.ReactNode | string[] | string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'>;

const StyledInput = styled.input<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
  background-color: var(--palette-white, #fff);
  font-size: 1rem;
  letter-spacing: 0.5px;
  line-height: 20px;
  height: 36px;
  align-items: center;
  padding-block-end: 12px;
  padding-block-start: 12px;
  padding-inline-end: 12px;
  padding-inline-start: 12px;
  padding: 0 12px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.$isValid ? 'rgba(0, 0, 0, 0.23)' : '#ff0000'};
  border-radius: 4px;

  &:hover {
    border-color: #63544f;
  }
  &:focus {
    border-color: ${(props) => (props.$isValid ? '#6db144;' : '#ff0000')};
    border-width: 2px;
  }
`;

const StyledWrapper = styled.div`
  margin-bottom: 18px;
`;

export function TextInput({
  id,
  label,
  showCounter = false,
  maxLength,
  isValid = true,
  isRequired = false,
  helpText,
  errorText,
  errorTextShort,
  value,
  ...rest
}: TextInputProps): JSX.Element {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <StyledWrapper>
      <TextLabel htmlFor={id} isValid={isValid} errorText={errorTextShort}>
        {label}
      </TextLabel>
      <StyledInput
        type="text"
        id={id}
        name={id}
        value={value}
        aria-required={isRequired}
        aria-invalid={!isValid}
        $isValid={isValid}
        {...rest}
      />
      <TextHelp
        showCounter={showCounter}
        characterCount={characterCount}
        maxLength={maxLength}
        helpText={helpText}
        errorText={errorText}
        isValid={isValid}
      />
    </StyledWrapper>
  );
}
