import { memo, SelectHTMLAttributes, useId } from 'react';
import styled from 'styled-components';
import { ListItem } from 'types/ListItem';

type Props = {
  readonly data?: ListItem[];
} & SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role => 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance
const InputSelect = ({ data, ...rest }: Props): React.JSX.Element => {
  const tempId = rest.id || useId();
  const props = { ...rest, id: tempId };

  return (
    <StyledSelect {...props}>
      {data?.map((item) => (
        <option key={item.key} value={item.value}>
          {item.display || item.value}
        </option>
      ))}
    </StyledSelect>
  );
};

InputSelect.displayName = 'InputSelect';

export default memo(InputSelect);

const StyledSelect = styled.select`
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  //font-size: 15px;
  border: none;
  height: 32px;
`;
