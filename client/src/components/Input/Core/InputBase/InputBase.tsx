import React, {
  type FC,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  memo,
  useRef,
} from 'react';

import useGetId from 'hooks/useGetId';
import styled from 'styled-components';
import type { KeyValue } from 'types/KeyValue';

import FieldWrapper, {
  type FieldWrapperProps,
} from '../FieldWrapper/FieldWrapper';

// Most attributes have an effect on only
// a specific subset of input types. In addition, the way some
// attributes impact an input depends on the input type,
// impacting different input types in different ways.

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//
// ACCESSIBILITY: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly

// declare const validityMatchers: readonly [
//   'badInput',
//   'patternMismatch',
//   'rangeOverflow',
//   'rangeUnderflow',
//   'stepMismatch',
//   'tooLong',
//   'tooShort',
//   'typeMismatch',
//   'valid',
//   'valueMissing',
// ];

type InputBaseProps = {
  readonly allowedCharacters?: RegExp;
  readonly dataList?: { readonly data?: KeyValue[]; readonly id: string };
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onClear?: (id: string) => void;
  readonly ref?: React.Ref<HTMLInputElement>;
  readonly type: HTMLInputTypeAttribute;
  readonly value?: number | string | string[];
} & FieldWrapperProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'accesskey'
    | 'autocorrect'
    | 'id'
    | 'name'
    | 'onChange'
    | 'onClick'
    | 'value'
  >;

// Input Attributes
// accesskey: never; // Don't use - not accessible
// autocorrect: a non-standard Safari attribute

const InputBase: FC<InputBaseProps> = ({
  dataList,
  endAdornment,
  id,
  // showCounter = false,
  // showError = true,
  // showRequired = true,
  // requiredLabel = 'Required',
  // requiredLabelProps,
  onChange,
  onClear,
  ref,
  required,
  startAdornment,
  type,
  value,
  ...rest
}: InputBaseProps): React.JSX.Element => {
  const currId = useGetId(id);

  const tempRef = useRef<HTMLInputElement>(null);
  const localRef = ref ?? tempRef;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      e.preventDefault();
    },
    [onChange],
  );

  return (
    <FieldWrapper endAdornment={endAdornment} startAdornment={startAdornment}>
      <StyledInput
        key={currId}
        list={dataList?.id}
        type={type}
        value={value}
        {...rest}
        onChange={handleChange}
        ref={localRef}
      />
      {dataList?.data ? (
        <datalist id={dataList.id}>
          {dataList.data.map((x) => (
            <option key={x.key} value={x.value} />
          ))}
        </datalist>
      ) : null}
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
