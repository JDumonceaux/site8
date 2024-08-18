import { TextareaHTMLAttributes } from 'react';
import { styled } from 'styled-components';

import LabelBase from '../LabelBase/LabelBase';
import ValidityState from '../ValidityState/ValidityState';

type TextAreaProps = {
  readonly characterCount?: number;
  readonly errorText?: React.ReactNode | string | string[];
  readonly errorTextShort?: string;
  readonly helpText?: React.ReactNode | string | string[];
  readonly id: string;
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly isRequired?: boolean;
  readonly label: string;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly maxLength?: number;
  readonly showCounter?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name' | 'type'>;

export const TextArea = ({
  id,
  isRequired = false,
  label,
  labelRef,
  value,
  ...rest
}: TextAreaProps): JSX.Element => {
  return (
    <StyledWrapper>
      <LabelBase label={label} ref={labelRef}>
        <ValidityState />
      </LabelBase>
      <StyledTextArea
        aria-required={isRequired}
        id={id}
        name={id}
        value={value}
        {...rest}
      />
    </StyledWrapper>
  );
};

const StyledTextArea = styled.textarea`
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
  border-radius: 4px;
  &:hover {
    border-color: #63544f;
  }
  &:focus {
    border-color: #6db144;
    border-width: 2px;
  }
`;
const StyledWrapper = styled.div`
  margin-bottom: 18px;
`;
