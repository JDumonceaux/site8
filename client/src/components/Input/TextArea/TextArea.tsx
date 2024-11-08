import { LabelProps } from '@radix-ui/react-label';
import React, { TextareaHTMLAttributes, useId, useRef } from 'react';
import { styled } from 'styled-components';
import LabelRow from '../Core/LabelRow/LabelRow';
import FooterRow from '../Core/FooterRow/FooterRow';
import FieldWrapper, {
  FieldWrapperProps,
} from '../Core/FieldWrapper/FieldWrapper';

type TextAreaProps = {
  readonly rows: number;
  readonly textareaRef?: React.RefObject<HTMLTextAreaElement>;
} & FieldWrapperProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'ref' | 'rows'>;

export const TextArea = ({
  id,
  rows,
  textareaRef,
  required,
  ...rest
}: TextAreaProps): React.JSX.Element => {
  const tempId = id || useId();
  const props = { ...rest, id: tempId, required: required };
  const localRef = textareaRef || useRef<HTMLTextAreaElement>(null);

  return (
    <FieldWrapper {...props}>
      <StyledTextArea ref={localRef} rows={rows} {...props} />
    </FieldWrapper>
  );
};
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
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
i  }
`;
