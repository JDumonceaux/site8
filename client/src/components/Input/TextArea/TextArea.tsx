import React, { useRef, useCallback, type TextareaHTMLAttributes } from 'react';

import useGetId from 'hooks/useGetId';
import { styled } from 'styled-components';

import FieldWrapper, {
  type FieldWrapperProps as FieldWrapperProperties,
} from '../Core/FieldWrapper/FieldWrapper';

type TextAreaProperties = {
  readonly ref?: React.RefObject<HTMLTextAreaElement>;
  readonly rows: number;
} & FieldWrapperProperties &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'ref' | 'rows'>;

export const TextArea = ({
  id,
  ref,
  required,
  rows,
  onChange,
  ...rest
}: TextAreaProperties): React.JSX.Element => {
  const currId = useGetId(id);

  const handleChange = useCallback(onChange, [onChange]);

  const tempRef = useRef<HTMLTextAreaElement>(null);
  const localRef = ref ?? tempRef;

  return (
    <FieldWrapper id={currId} required={required} onChange={handleChange}>
      <StyledTextArea
        ref={localRef}
        rows={rows}
        onChange={handleChange}
        {...rest}
      />
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
