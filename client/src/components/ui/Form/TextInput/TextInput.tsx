import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';
import { TextHelp } from '../TextHelp';
import { EndAdornment } from '../EndAdornment/EndAdornment';
import { TextLabel } from '../TextLabel';
import { styled } from 'styled-components';

type TextInputProps = {
  readonly type?: HTMLInputTypeAttribute | undefined;
  readonly id: string;
  readonly label: string;
  readonly showCounter?: boolean;
  readonly characterCount?: number;
  readonly maxLength?: number;
  readonly isValid?: boolean;
  readonly required?: boolean;
  readonly helpText?: React.ReactNode | string[] | string;
  readonly errorTextShort?: string;
  readonly errorText?: React.ReactNode | string[] | string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'>;

// "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden"
// "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit"
// "tel" | "text" | "time" | "url" | "week"

export const TextInput = ({
  id,
  label,
  showCounter = false,
  maxLength,
  isValid = true,
  required = false,
  helpText,
  errorText,
  errorTextShort,
  value,
  type = 'text',
  ...rest
}: TextInputProps): JSX.Element => {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  const [showPassword, setShowPassword] = useState(false);
  const [currentType, setCurrentType] = useState(type);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setCurrentType(showPassword ? 'password' : 'text');
  };

  return (
    <StyledWrapper>
      <TextLabel errorText={errorTextShort} htmlFor={id} isValid={isValid}>
        {label}
      </TextLabel>
      <StyledDivWrapper $isValid={isValid}>
        <StyledInput
          $isValid={isValid}
          aria-invalid={!isValid}
          aria-required={required}
          id={id}
          maxLength={maxLength}
          name={id}
          required={required}
          type={currentType}
          value={value}
          {...rest}
        />
        {type === 'password' ? (
          <EndAdornment onClick={handleTogglePassword} />
        ) : null}
      </StyledDivWrapper>
      <TextHelp
        characterCount={characterCount}
        errorText={errorText}
        helpText={helpText}
        isValid={isValid}
        maxLength={maxLength}
        showCounter={showCounter}
      />
    </StyledWrapper>
  );
};

const StyledInput = styled.input<{ $isValid: boolean }>`
  position: relative;
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
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
const StyledDivWrapper = styled.div<{ $isValid: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
  background-color: #ffffff;
  padding: 0 6px;
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
