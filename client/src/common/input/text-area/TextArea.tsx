import {
  type ChangeEvent,
  type JSX,
  type TextareaHTMLAttributes,
  useRef,
} from 'react';

import useGetId from '@hooks/useGetId';
import FieldWrapper, {
  type FieldWrapperProps,
} from '../base/field-wrapper/FieldWrapper';
import styled from 'styled-components';

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
  endAdornment,
  endAdornmentProps,
  errors,
  footerEndAdornment,
  id,
  isRequired,
  isShowCounter,
  label,
  labelProps,
  maxLength,
  messages,
  onChange,
  ref,
  required,
  rows,
  startAdornment,
  startAdornmentProps,
  ...textareaProps // only genuine TextareaHTMLAttributes remain
}: TextAreaProps): JSX.Element | null => {
  const currentId = useGetId(id);
  const tempRef = useRef<HTMLTextAreaElement>(null);
  const localRef = ref ?? tempRef;

  const fieldWrapperProps: FieldWrapperProps = {
    ...(endAdornment !== undefined && { endAdornment }),
    ...(endAdornmentProps !== undefined && { endAdornmentProps }),
    ...(errors !== undefined && { errors }),
    ...(footerEndAdornment !== undefined && { footerEndAdornment }),
    ...(isShowCounter !== undefined && { isShowCounter }),
    ...(label !== undefined && { label }),
    ...(labelProps !== undefined && {
      labelProps: { ...labelProps, htmlFor: currentId },
    }),
    ...(!labelProps && { labelProps: { htmlFor: currentId } }),
    ...(maxLength !== undefined && { maxLength }),
    ...(messages !== undefined && { messages }),
    ...(startAdornment !== undefined && { startAdornment }),
    ...(startAdornmentProps !== undefined && { startAdornmentProps }),
    ...(isRequired === undefined
      ? required !== undefined && { isRequired: required }
      : { isRequired }),
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <StyledTextArea
        id={currentId}
        name={currentId}
        onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
        ref={localRef}
        rows={rows}
        {...textareaProps}
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
  border-radius: var(--border-radius-md);
  width: 100%;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
