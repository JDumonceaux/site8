import { memo, SelectHTMLAttributes, useId, useRef } from 'react';
import styled from 'styled-components';
import { ListItem } from 'types/ListItem';
import FieldWrapper, {
  FieldWrapperProps,
} from '../Core/FieldWrapper/FieldWrapper';

type Props = {
  readonly data?: ListItem[];
  readonly value: string | number | string[];
  readonly selectRef?: React.RefObject<HTMLSelectElement>;
  readonly description?: string;
  readonly allowedCharacters?: RegExp;
  readonly placeholder?: string;
  readonly showBlankOption?: boolean;
} & FieldWrapperProps &
  SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role => 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance
const InputSelect = ({
  data,
  id,
  required,
  selectRef,
  placeholder,
  showBlankOption = false,
  ...rest
}: Props): React.JSX.Element => {
  const tempId = id || useId();
  const props = { ...rest, id: tempId, required: required };
  const localRef = selectRef || useRef<HTMLSelectElement>(null);

  return (
    <FieldWrapper {...props}>
      <StyledSelect {...props} ref={localRef}>
        {showBlankOption && <option value=""></option>}
        {placeholder && <option value="placeholder">{placeholder}</option>}
        {data?.map((item) => (
          <option key={item.key} value={item.value}>
            {item.display || item.value}
          </option>
        ))}
      </StyledSelect>
    </FieldWrapper>
  );
};

InputSelect.displayName = 'InputSelect';

export default memo(InputSelect);

const StyledSelect = styled.select`
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
  :focus {
    outline: none;
  }
`;
