import { memo, useRef, useMemo, type SelectHTMLAttributes } from 'react';

import useGetId from 'hooks/useGetId';
import styled from 'styled-components';
import type { ListItem } from 'types/ListItem';

import FieldWrapper, {
  type FieldWrapperProps,
} from '../Core/FieldWrapper/FieldWrapper';

type Props = {
  readonly allowedCharacters?: RegExp;
  readonly dataList?: ListItem[];
  readonly placeholder?: string;
  readonly ref?: React.Ref<HTMLSelectElement>;
  readonly showBlankOption?: boolean;
  readonly value: number | string | string[];
} & FieldWrapperProps &
  SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role => 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance
const InputSelect = memo(
  ({
    dataList,
    id,
    placeholder,
    ref,
    required,
    showBlankOption = false,
    ...rest
  }: Props): React.JSX.Element => {
    const currId = useGetId(id);
    const props = { ...rest, id: currId, required };
    const tempRef = useRef<HTMLSelectElement>(null);
    const localRef = ref ?? tempRef;

    return useMemo(
      () => (
        <FieldWrapper {...props}>
          <StyledSelect {...props} ref={localRef}>
            {showBlankOption ? <option value="" /> : null}
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
      ),
      [props, showBlankOption, placeholder, dataList, localRef],
    );
  },
);

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
