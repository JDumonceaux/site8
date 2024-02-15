import { TextLabel } from '../TextLabel';
import { styled } from 'styled-components';

import { InputHTMLAttributes } from 'react';
import { TextHelp } from '../TextHelp';

type TextInputProps = {
  id: string;
  label: string;
  showCounter?: boolean;
  characterCount?: number;
  maxLength?: number;
  isValid?: boolean;
  isRequired?: boolean;
  helpText?: React.ReactNode | string[] | string;
  errorText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'>;

const StyledInput = styled.input<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
  background-color: var(--palette-white, #fff);
  font-size: 1rem;
  letter-spacing: 0.5px;
  line-height: 20px;
  height: 46px;
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
    border-color: #6db144;
    border-width: 2px;
  }
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
  value,
  ...rest
}: TextInputProps): JSX.Element {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <div className="text-input">
      <TextLabel htmlFor={id} isValid={isValid} errorText={errorText}>
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
        maxLength={maxLength}>
        {helpText}
      </TextHelp>
    </div>
  );
}
