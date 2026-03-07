import { type JSX, type SelectHTMLAttributes, useRef } from 'react';

import useGetId from '@hooks/useGetId';
import type { ListItem } from '@types';
import FieldWrapper, {
  type FieldWrapperProps,
} from '../base/field-wrapper/FieldWrapper';
import styled from 'styled-components';

type InputSelectProps = {
  readonly allowedCharacters?: RegExp;
  readonly dataList?: ListItem[];
  readonly isShowBlankOption?: boolean;
  readonly placeholder?: string;
  readonly ref?: React.Ref<HTMLSelectElement>;
  readonly value: number | string | string[];
} & FieldWrapperProps &
  SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role ⇒ 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance

const InputSelect = ({
  dataList,
  endAdornment,
  endAdornmentProps,
  errors,
  footerEndAdornment,
  id,
  isRequired,
  isShowBlankOption = false,
  isShowCounter,
  label,
  labelProps,
  maxLength,
  messages,
  placeholder,
  ref,
  startAdornment,
  startAdornmentProps,
  ...selectProps // only genuine SelectHTMLAttributes remain
}: InputSelectProps): JSX.Element | null => {
  const currentId = useGetId(id);
  const tempRef = useRef<HTMLSelectElement>(null);
  const selectRef = ref ?? tempRef;

  const fieldWrapperProps: FieldWrapperProps = {
    ...(endAdornment !== undefined && { endAdornment }),
    ...(endAdornmentProps !== undefined && { endAdornmentProps }),
    ...(errors !== undefined && { errors }),
    ...(footerEndAdornment !== undefined && { footerEndAdornment }),
    ...(isShowCounter !== undefined && { isShowCounter }),
    ...(label !== undefined && { label }),
    labelProps: {
      ...labelProps,
      htmlFor: currentId,
    },
    ...(maxLength !== undefined && { maxLength }),
    ...(messages !== undefined && { messages }),
    ...(startAdornment !== undefined && { startAdornment }),
    ...(startAdornmentProps !== undefined && { startAdornmentProps }),
    ...(isRequired !== undefined && { isRequired }),
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <SelectContainer>
        <StyledSelect
          {...selectProps}
          id={currentId}
          ref={selectRef}
        >
          {isShowBlankOption ? <option value="">Current folder</option> : null}
          {placeholder ? (
            <option value="placeholder">{placeholder}</option>
          ) : null}
          {dataList?.map((item) => (
            <option
              key={item.key}
              value={item.value}
            >
              {item.display ?? item.value}
            </option>
          ))}
        </StyledSelect>
        <SelectArrow aria-hidden>▾</SelectArrow>
      </SelectContainer>
    </FieldWrapper>
  );
};

InputSelect.displayName = 'InputSelect';
export default InputSelect;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectArrow = styled.span`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(calc(-50% + 1px));
  color: var(--text-secondary-color);
  font-size: 1.25rem;
  line-height: 1;
  pointer-events: none;
`;

const StyledSelect = styled.select`
  font-size: var(--font-size-sm);
  color: var(--input-color);
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  padding: 0 1.75rem 0 0.625rem;
  border: none;
  min-height: 2.25rem;
  width: 100%;
  appearance: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:disabled {
    color: var(--disabled-text);
    cursor: not-allowed;
  }
`;
