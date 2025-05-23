import {
  memo,
  type FC,
  useState,
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

type InputRootProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'accessKey' | 'autoCorrect' | 'id' | 'name' | 'onChange' | 'type' | 'value'
>;

type InputAddProps = {
  readonly allowedCharacters?: RegExp;
  readonly dataList?: { readonly data?: KeyValue[]; readonly id: string };
  readonly defaultValue?: number | string;
  readonly inputRef?: Ref<HTMLInputElement>;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly type: React.HTMLInputTypeAttribute;
  readonly value?: number | string;
};

type InputBaseProps = InputRootProps & InputAddProps & FieldWrapperProps;

/**
 * Base input component with label, adornments, and optional datalist.
 */
const InputBase: FC<InputBaseProps> = memo(
  ({
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
    ...footerProps
  }) => {
    const [fieldLength, setFieldLength] = useState(String(defaultValue).length);
    const generatedId = useGetId(id);
    const internalRef = useRef<HTMLInputElement>(null);
    const refToUse = inputRef ?? internalRef;

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
      ...inputProps
    } = {
      dataList,
      defaultValue,
      errors,
      id: generatedId,
      inputRef: refToUse,
      labelProps,
      name: generatedId,
      onChange,
      type,
      value,
      ...footerProps,
    };

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setFieldLength(e.target.value.length);
        onChange?.(e);
      },
      [onChange],
    );

    return (
      <FieldWrapper
        {...footerProps}
        fieldLength={fieldLength}
        required={required}>
        <StyledInput
          {...inputProps}
          defaultValue={defaultValue}
          id={generatedId}
          list={dataList?.id}
          onChange={handleChange}
          ref={refToUse}
          type={type}
          value={value}
        />
        {dataList?.data ? (
          <datalist id={dataList.id}>
            {dataList.data.map(({ key, value }) => (
              <option key={key} value={value} />
            ))}
          </datalist>
        ) : null}
      </FieldWrapper>
    );
  },
);

InputBase.displayName = 'InputBase';
export default InputBase;
export type { InputBaseProps };

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
