import {
  useRef,
  type TextareaHTMLAttributes,
  type ChangeEvent,
  type JSX,
} from 'react';

import useGetId from 'hooks/useGetId';
import styled from 'styled-components';

import FieldWrapper, {
  type FieldWrapperProps,
} from '../Base/FieldWrapper/FieldWrapper';

// Most attributes have an effect on only
// a specific subset of input types. In addition, the way some
// attributes impact an input depends on the input type,
// impacting different input types in different ways.

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//
// ACCESSIBILITY: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly

type TextAreaRootProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name' | 'ref' | 'rows'
>;

type TextAreaAddProps = {
  readonly ref?: React.RefObject<HTMLTextAreaElement>;
  readonly rows: number;
};

type TextAreaProps = TextAreaRootProps & TextAreaAddProps & FieldWrapperProps;

/**
 * A textarea with integrated label, error display, and adornments.
 */
export const TextArea = ({
  id,
  onChange,
  ref,
  required,
  rows,
  ...rest
}: TextAreaProps): JSX.Element | null => {
  const currId = useGetId(id);
  const tempRef = useRef<HTMLTextAreaElement>(null);
  const localRef = ref ?? tempRef;

  // Separate out wrapper vs. textarea props
  const textAreaProps = { ...rest };
  delete textAreaProps.labelProps;

  return (
    <FieldWrapper required={required} {...(rest as FieldWrapperProps)}>
      <StyledTextArea
        id={currId}
        name={currId}
        onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
        ref={localRef}
        rows={rows}
        {...(textAreaProps as TextAreaRootProps)}
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
  letter-spacing: 0.5px;
  line-height: 20px;
  padding: 6px;
  border: 1px solid var(--input-border-color, #ccc);
  border-radius: 4px;
  width: 100%;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
