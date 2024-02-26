import { TextHelp } from '../TextHelp';
import { TextLabel } from '../TextLabel';
import { styled } from 'styled-components';

import { TextareaHTMLAttributes } from 'react';

type TextAreaProps = {
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
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name' | 'type'>;

export const TextArea = ({
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
}: TextAreaProps): JSX.Element => {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <div className="text-area">
      <TextLabel errorText={errorTextShort} htmlFor={id} isValid={isValid}>
        {label}
      </TextLabel>
      <StyledTextArea
        $isValid={isValid}
        aria-invalid={!isValid}
        aria-required={isRequired}
        id={id}
        name={id}
        value={value}
        {...rest}
      />
      <TextHelp
        characterCount={characterCount}
        maxLength={maxLength}
        showCounter={showCounter}>
        {isValid ? helpText : errorText}
      </TextHelp>
    </div>
  );
};

const StyledTextArea = styled.textarea<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
  background-color: var(--palette-white, #fff);
  font-size: 1rem;
  letter-spacing: 0.5px;
  line-height: 20px;
  padding-block-end: 6px;
  padding-block-start: 6px;
  padding-inline-end: 6px;
  padding-inline-start: 6px;
  padding: 6px 6px;
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
