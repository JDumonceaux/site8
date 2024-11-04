import { LabelProps } from '@radix-ui/react-label';
import React, { TextareaHTMLAttributes, useId } from 'react';
import { styled } from 'styled-components';
import LabelRow from '../Core/LabelRow/LabelRow';

type TextAreaProps = {
  readonly rows: number;
  readonly textareaRef?: React.RefObject<HTMLTextAreaElement>;
  readonly labelProps?: LabelProps;
  readonly label: string;
} & Omit<LabelProps, 'ref' | 'onBlur' | 'onClick' | 'onChange'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'ref' | 'rows'>;

export const TextArea = ({
  id,
  rows,
  textareaRef,
  label,
  labelProps,
  required,
  ...rest
}: TextAreaProps): React.JSX.Element => {
  const tempId = id || useId();
  const props = { ...rest, id: tempId, required: required };

  return (
    <div id={tempId}>
      <LabelRow
        htmlFor={tempId}
        label={label}
        {...labelProps}
        required={required}
      />
      <FieldWrapper>
        <StyledTextArea ref={textareaRef} rows={rows} {...props} />
      </FieldWrapper>
    </div>
  );
};
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--input-color);
  background-color: var(--input-background-color);
  border-radius: var(--input-border-radius, 0);
  border: 1px solid var(--input-border-color);
  width: 100%;
  &:has(textarea[required]) {
    border-left: 3px solid var(--input-border-required-color);
  }
`;

const StyledTextArea = styled.textarea`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
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
  width: 100%;
  &:hover {
    border-color: #63544f;
  }
  &:focus {
    border-color: #6db144;
    border-width: 2px;
  }
`;
