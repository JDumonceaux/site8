import {
  type ChangeEvent,
  type JSX,
  type Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import useGetId from '@hooks/useGetId';
import type { KeyValue } from '@types';
import FieldWrapper, {
  type FieldWrapperProps,
} from '../field-wrapper/FieldWrapper';
import styled from 'styled-components';

type InputRootProps = Omit<
  JSX.IntrinsicElements['input'],
  'accessKey' | 'autoCorrect' | 'id' | 'name' | 'onChange' | 'type' | 'value'
>;

type InputAddProps = {
  readonly allowedCharacters?: RegExp;
  readonly dataList?: { readonly data?: KeyValue[]; readonly id: string };
  readonly defaultValue?: number | string;
  readonly inputRef?: Ref<HTMLInputElement>;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly type: JSX.IntrinsicElements['input']['type'];
  readonly value?: number | string;
};

export type InputBaseProps = InputRootProps & InputAddProps & FieldWrapperProps;

const InputBase = ({
  allowedCharacters,
  dataList,
  defaultValue = '',
  errors,
  id,
  inputRef,
  isRequired,
  labelProps,
  onChange,
  type,
  value,
  ...footerProps
}: InputBaseProps): JSX.Element => {
  const generatedId = useGetId(id);
  const [fieldLength, setFieldLength] = useState<number>(
    String(value ?? defaultValue).length,
  );
  const internalRef = useRef<HTMLInputElement>(null);
  const refToUse = inputRef ?? internalRef;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      if (allowedCharacters) {
        newValue = Array.from(newValue)
          .filter((ch) => allowedCharacters.test(ch))
          .join('');
        e.target.value = newValue;
      }
      setFieldLength(newValue.length);
      onChange?.(e);
    },
    [allowedCharacters, onChange],
  );

  const fieldWrapperProps: FieldWrapperProps = useMemo(
    () => ({
      ...footerProps,
      ...(errors !== undefined && { errors }),
      labelProps: {
        ...labelProps,
        htmlFor: generatedId,
        id: `${generatedId}-label`,
      },
    }),
    [errors, footerProps, generatedId, labelProps],
  );

  return (
    <FieldWrapper
      {...fieldWrapperProps}
      fieldLength={fieldLength}
      {...(isRequired !== undefined && { isRequired })}
    >
      <StyledInput
        autoComplete="off"
        {...(value === undefined ? { defaultValue } : { value })}
        {...(dataList ? { list: dataList.id } : {})}
        {...footerProps}
        id={generatedId}
        onChange={handleChange}
        ref={refToUse}
        type={type}
      />
      {dataList?.data ? (
        <datalist id={dataList.id}>
          {dataList.data.map(({ key, value: val }) => (
            <option
              aria-label={val}
              key={key}
              value={val}
            />
          ))}
        </datalist>
      ) : null}
    </FieldWrapper>
  );
};

InputBase.displayName = 'InputBase';
export default InputBase;

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
