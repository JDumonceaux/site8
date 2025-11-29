import { type JSX, type SelectHTMLAttributes, useRef } from 'react';

import useGetId from '@hooks/useGetId';
import type { ListItem } from '@shared/types/ListItem';
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
  id,
  isRequired,
  isShowBlankOption = false,
  placeholder,
  ref,
  ...rest
}: InputSelectProps): JSX.Element | null => {
  const currentId = useGetId(id);
  const tempRef = useRef<HTMLSelectElement>(null);
  const selectRef = ref ?? tempRef;
  // commonProps includes wrapper props (errors, labelProps, etc.) plus select attrs
  const commonProps = { ...rest, id: currentId, isRequired };

  return (
    <FieldWrapper {...commonProps}>
      <StyledSelect
        {...commonProps}
        ref={selectRef}
      >
        {isShowBlankOption ? <option value="">Select an option</option> : null}
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
    </FieldWrapper>
  );
};

InputSelect.displayName = 'InputSelect';
export default InputSelect;

const StyledSelect = styled.select`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  border: none;
  height: 32px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
