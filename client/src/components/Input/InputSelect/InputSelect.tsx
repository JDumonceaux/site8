import { useRef, type SelectHTMLAttributes, type JSX } from 'react';

import useGetId from 'hooks/useGetId';
import styled from 'styled-components';
import type { ListItem } from 'types/ListItem';

import FieldWrapper, {
  type FieldWrapperProps,
} from '../Base/FieldWrapper/FieldWrapper';

type InputSelectProps = {
  readonly allowedCharacters?: RegExp;
  readonly dataList?: ListItem[];
  readonly placeholder?: string;
  readonly ref?: React.Ref<HTMLSelectElement>;
  readonly showBlankOption?: boolean;
  readonly value: number | string | string[];
} & FieldWrapperProps &
  SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role ⇒ 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance

const InputSelect = ({
  dataList,
  id,
  placeholder,
  ref,
  required,
  showBlankOption = false,
  ...rest
}: InputSelectProps): JSX.Element | null => {
  const currId = useGetId(id);
  const tempRef = useRef<HTMLSelectElement>(null);
  const selectRef = ref ?? tempRef;
  // commonProps includes wrapper props (errors, labelProps, etc.) plus select attrs
  const commonProps = { ...rest, id: currId, required };

  return (
    <FieldWrapper {...commonProps}>
      <StyledSelect {...commonProps} ref={selectRef}>
        {showBlankOption ? <option value="">Select an option</option> : null}
        {placeholder ? (
          <option value="placeholder">{placeholder}</option>
        ) : null}
        {dataList?.map((item) => (
          <option key={item.key} value={item.value}>
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
