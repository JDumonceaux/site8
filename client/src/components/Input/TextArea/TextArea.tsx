import React, { type TextareaHTMLAttributes } from 'react';

import { styled } from 'styled-components';

import FieldWrapper, {
  type FieldWrapperProps as FieldWrapperProperties,
} from '../Core/FieldWrapper/FieldWrapper';

type TextAreaProperties = {
  readonly rows: number;
  readonly textareaRef?: React.RefObject<HTMLTextAreaElement>;
} & FieldWrapperProperties &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'ref' | 'rows'>;

export const TextArea = ({
  id,
  required,
  rows,
  textareaRef,
  ...rest
}: TextAreaProperties): React.JSX.Element => {
  const temporaryId = id || useId();
  const props = { ...rest, id: temporaryId, required };
  const localReference = textareaRef || useRef<HTMLTextAreaElement>(null);

  return (
    <FieldWrapper {...props}>
      <StyledTextArea ref={localReference} rows={rows} {...props} />
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
