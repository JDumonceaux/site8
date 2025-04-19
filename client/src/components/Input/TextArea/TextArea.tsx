import React, { useRef, useCallback, type TextareaHTMLAttributes } from 'react';

import useGetId from 'hooks/useGetId';
import styled from 'styled-components';

import FieldWrapper, {
  FieldWrapperProps,
  type FieldWrapperProps as FieldWrapperProperties,
} from '../Core/FieldWrapper/FieldWrapper';

type TextAreaRootProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name' | 'ref' | 'rows'
>;

type TextAreaAddProps = {
  readonly ref?: React.RefObject<HTMLTextAreaElement>;
  readonly rows: number;
};

type TextAreaProps = TextAreaRootProps & TextAreaAddProps & FieldWrapperProps;

const TextArea = ({
  id,
  onChange,
  ref,
  required,
  rows,
  ...rest
}: TextAreaProps): React.JSX.Element => {
  const currId = useGetId(id);

  const tempRef = useRef<HTMLTextAreaElement>(null);
  const localRef = ref ?? tempRef;

  return (
    <FieldWrapper {...(rest as FieldWrapperProps)}>
      <StyledTextArea
        ref={localRef}
        rows={rows}
        {...(rest as TextAreaRootProps)}
      />
    </FieldWrapper>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;

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
