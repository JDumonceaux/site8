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

export const TextInput = ({
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
}: TextInputProps): JSX.Element => {
  const characterCount =
    typeof value === 'string' || value instanceof String ? value.length : 0;

  return (
    <StyledWrapper>
      <TextLabel errorText={errorTextShort} htmlFor={id} isValid={isValid}>
        {label}
      </TextLabel>
      <StyledDivWrapper $isValid={isValid}>
        <StyledInput
          $isValid={isValid}
          aria-invalid={!isValid}
          aria-required={isRequired}
          id={id}
          maxLength={maxLength}
          name={id}
          type="text"
          value={value}
          {...rest}
        />
        <StyledButton type="reset" />
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
const StyledButton = styled.button`
  position: absolute;
  z-index: 1;
  right: 6px;
  border: none;
  cursor: pointer;
  height: 24px;
  width: 24px;
  &:after {
    content: 'X';
    display: inline-block;
    line-height: 18px;
    font-size: 0.6rem;
    height: 80%;
    width: 80%;
    transform: translateY(-10%);
    border-radius: 50%;
    color: white;
    background-color: #a9a9a9;
  }
`;
