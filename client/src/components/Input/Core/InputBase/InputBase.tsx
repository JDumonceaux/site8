import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  useRef,
  useId,
} from 'react';
import styled from 'styled-components';
import FieldWrapper, { FieldWrapperProps } from '../FieldWrapper/FieldWrapper';

// Most attributes have an effect on only
// a specific subset of input types. In addition, the way some
// attributes impact an input depends on the input type,
// impacting different input types in different ways.

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//
// ACCESSIBILITY: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly

declare const validityMatchers: readonly [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valid',
  'valueMissing',
];

type InputBaseProps = {
  readonly value: string | number | string[];
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly type: HTMLInputTypeAttribute;
  readonly allowedCharacters?: RegExp;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onClear?: (id: string) => void;
} & FieldWrapperProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'accesskey'
    | 'autocorrect'
    | 'id'
    | 'ref'
    | 'name'
    | 'onChange'
    | 'value'
    | 'onClick'
  >;

// Input Attributes
// accesskey: never; // Don't use - not accessible
// autocorrect: a non-standard Safari attribute

const InputBase = ({
  value,
  inputRef,
  type,

  endAdornment,
  startAdornment,
  showClear = true,
  required,
  id,
  // showCounter = false,
  // showError = true,
  // showRequired = true,
  // requiredLabel = 'Required',
  // requiredLabelProps,
  onChange,
  onClear,

  ...rest
}: InputBaseProps): JSX.Element => {
  const tempId = id || useId();
  const props = { ...rest, id: tempId, required: required };
  const localRef = inputRef || useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    e.preventDefault();
  };

  return (
    <FieldWrapper {...props}>
      <StyledInput
        key={tempId}
        value={value}
        type={type}
        {...props}
        ref={localRef}
        // aria-describedby={counterId}
        onChange={handleChange}
      />
    </FieldWrapper>
  );
};

InputBase.displayName = 'InputBase';

export default memo(InputBase);

export type { InputBaseProps };

const StyledInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: none;
  height: 32px;
  width: 100%;
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
  }
  // &:hover {
  //   box-shadow: 0 0 0 1px var(--input-border-hover);
  // }
  // &::selection {
  //   //  Accessibility don't override unless you have a good reason
  // }
  // &::spelling-error {
  //   text-decoration: wavy underline var(--input-error);
  // }
  // &::grammar-error {
  //   text-decoration: underline var(--input-error);
  // }
  // &::placeholder {
  //   font-size: 0.9rem;
  //   color: var(--input-placeholder);
  // }
  // &:invalid {
  //   color: var(--input-error);
  // }
  // &[required] {
  //   border-left: 3px solid var(--input-border-required);
  // }
  // @supports not selector(:user-invalid) {
  //   input:invalid {
  //     color: var(--input-error);
  //   }
  //   input:valid {
  //     /* Valid input UI styles */
  //   }
  // }
`;
