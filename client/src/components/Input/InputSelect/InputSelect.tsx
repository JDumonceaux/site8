import type { SelectHTMLAttributes } from 'react';
import { memo, useId, useRef } from 'react';

import styled from 'styled-components';
import type { ListItem } from 'types/ListItem';

import type { FieldWrapperProps } from '../Core/FieldWrapper/FieldWrapper';
import FieldWrapper from '../Core/FieldWrapper/FieldWrapper';

type Props = {
  readonly allowedCharacters?: RegExp;
  readonly data?: ListItem[];
  readonly description?: string;
  readonly placeholder?: string;
  readonly selectRef?: React.RefObject<HTMLSelectElement>;
  readonly showBlankOption?: boolean;
  readonly value: number | string | string[];
} & FieldWrapperProps &
  SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role => 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance
const InputSelect = ({
  data,
  id,
  placeholder,
  required,
  selectRef,
  showBlankOption = false,
  ...rest
}: Props): React.JSX.Element => {
  const tempId = id || useId();
  const props = { ...rest, id: tempId, required };
  const localRef = selectRef || useRef<HTMLSelectElement>(null);

  return (
    <FieldWrapper {...props}>
      <StyledSelect {...props} ref={localRef}>
        {showBlankOption ? <option value="" /> : null}
        {placeholder ? (
          <option value="placeholder">{placeholder}</option>
        ) : null}
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
