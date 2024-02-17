import { TextHelp } from '../TextHelp';
import { TextLabel } from '../TextLabel';
import { styled } from 'styled-components';

import { TextareaHTMLAttributes } from 'react';

type TextAreaProps = {
  id: string;
  label: string;
  showCounter?: boolean;
  characterCount?: number;
  maxLength?: number;
  isValid?: boolean;
  isRequired?: boolean;
  helpText?: React.ReactNode | string[] | string;
  errorTextShort?: string;
  errorText?: React.ReactNode | string[] | string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name' | 'type'>;

const StyledTextArea = styled.textarea<{ $isValid: boolean }>`
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

export function TextArea({
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
}: TextAreaProps): JSX.Element {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <div className="text-area">
      <TextLabel htmlFor={id} isValid={isValid} errorText={errorTextShort}>
        {label}
      </TextLabel>
      <StyledTextArea
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
        {isValid ? helpText : errorText}
      </TextHelp>
    </div>
  );
}
