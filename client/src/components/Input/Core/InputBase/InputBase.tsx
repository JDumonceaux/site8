import {
  memo,
  type JSX,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ChangeEvent,
  type Ref,
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
//
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

/**
 * Props for the base input component with adornments and datalist support.
 */
type InputRootProps = Omit<
  JSX.IntrinsicElements['input'],
  'accessKey' | 'autoCorrect' | 'id' | 'name' | 'onChange' | 'type' | 'value'
>;

type InputAddProps = {
  /** RegExp to restrict allowed characters in input */
  readonly allowedCharacters?: RegExp;
  /** Optional datalist data and generated id */
  readonly dataList?: { readonly data?: KeyValue[]; readonly id: string };
  /** Default uncontrolled value */
  readonly defaultValue?: number | string;
  /** External ref for the input element */
  readonly inputRef?: Ref<HTMLInputElement>;
  /** Change event handler */
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Input type attribute */
  readonly type: JSX.IntrinsicElements['input']['type'];
  /** Controlled value */
  readonly value?: number | string;
};

export type InputBaseProps = InputRootProps & InputAddProps & FieldWrapperProps;

/**
 * Base input component with label, adornments, and optional datalist.
 */
function InputBase({
  dataList,
  defaultValue = '',
  errors,
  id,
  inputRef,
  labelProps,
  onChange,
  required,
  type,
  value,
  allowedCharacters,
  ...footerProps
}: InputBaseProps): JSX.Element {
  const generatedId = useGetId(id);
  const [fieldLength, setFieldLength] = useState<number>(
    String(value ?? defaultValue).length,
  );
  const internalRef = useRef<HTMLInputElement>(null);
  const refToUse = inputRef ?? internalRef;

  // Sync length if controlled value changes
  useEffect(() => {
    setFieldLength(String(value ?? defaultValue).length);
  }, [value, defaultValue]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      if (allowedCharacters) {
        // filter out disallowed characters
        newValue = Array.from(newValue)
          .filter((ch) => allowedCharacters.test(ch))
          .join('');
        // update the displayed value
        e.target.value = newValue;
      }
      setFieldLength(newValue.length);
      onChange?.(e);
    },
    [onChange, allowedCharacters],
  );

  // merge all props then extract input-specific attributes
  const merged = {
    dataList,
    defaultValue,
    errors,
    id: generatedId,
    inputRef: refToUse,
    labelProps,
    name: generatedId,
    onChange,
    required,
    type,
    value,
    ...footerProps,
  };
  const {
    dataList: _dl,
    defaultValue: _dv,
    errors: _errs,
    inputRef: _ir,
    labelProps: _lp,
    onChange: _oc,
    required: _rq,
    type: _t,
    value: _v,
    name: _nm,
    ...inputProps
  } = merged;

  return (
    <FieldWrapper
      {...footerProps}
      fieldLength={fieldLength}
      required={required}>
      <StyledInput
        {...(value === undefined ? { defaultValue } : { value })}
        {...(dataList ? { list: dataList.id } : {})}
        {...inputProps}
        id={generatedId}
        ref={refToUse}
        onChange={handleChange}
        type={type}
      />
      {dataList?.data && (
        <datalist id={dataList.id}>
          {dataList.data.map(({ key, value: val }) => (
            <option key={key} value={val} />
          ))}
        </datalist>
      )}
    </FieldWrapper>
  );
}

InputBase.displayName = 'InputBase';
export default memo(InputBase);

const StyledInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: inherit;
  background: inherit;
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  border: none;
  height: 32px;
  width: 100%;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
