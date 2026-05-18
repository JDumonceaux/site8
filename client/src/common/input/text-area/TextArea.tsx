import { type JSX, type TextareaHTMLAttributes, useMemo, useRef } from 'react';

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
  id,
  isRequired: propertyIsRequired,
  label,
  labelProps,
  onChange,
  ref,
  required,
  rows,
  // All remaining props
  ...restProps
}: TextAreaProps): JSX.Element | null => {
  const currentId = useGetId(id);
  const tempRef = useRef<HTMLTextAreaElement>(null);
  const localRef = ref ?? tempRef;

  // Use explicitly passed isRequired, fall back to required HTML attribute
  const isRequired = propertyIsRequired ?? required;

  const resolvedLabelProps = useMemo(
    () => ({
      ...labelProps,
      htmlFor: currentId,
      id: `${currentId}-label`,
    }),
    [currentId, labelProps],
  );

  return (
    <FieldWrapper
      label={label}
      labelProps={resolvedLabelProps}
      {...(isRequired !== undefined && { isRequired })}
      {...restProps}
    >
      <StyledTextArea
        id={currentId}
        name={currentId}
        onChange={onChange}
        ref={localRef}
        rows={rows}
        {...restProps}
      />
    </FieldWrapper>
  );
};
export default TextArea;

const StyledTextArea = styled.textarea`
  color: var(--input-color);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  background-color: var(--input-background-color);
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
