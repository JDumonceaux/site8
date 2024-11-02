import { memo, SelectHTMLAttributes, useId } from 'react';
import styled from 'styled-components';
import { ListItem } from 'types/ListItem';
import LabelRow, { LabelProps } from '../Core/LabelRow/LabelRow';
import { TooltipBaseProps } from '../Core/Tooltip/TooltipBase';

type Props = {
  readonly data?: ListItem[];
  readonly value: string | number | string[];
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly description?: string;
 
  readonly labelProps?: LabelProps;
  readonly toolTipProps?: TooltipBaseProps;
  readonly endAdornment?: React.ReactNode;
  readonly startAdornment?: React.ReactNode;
  readonly showClear?: boolean;
  readonly allowedCharacters?: RegExp;
   
} & Omit<LabelProps, 'ref' | 'onClick' | 'onChange'> & SelectHTMLAttributes<HTMLSelectElement>;

// Implicit aria-role => 'combobox' or 'listbox'
// https://www.w3.org/TR/html-aria/#docconformance
const InputSelect = ({ data, label,labelProps, ...rest }: Props): React.JSX.Element => {
  const tempId = rest.id || useId();
  const props = { ...rest, id: tempId };

  return (
    <div id={tempId}>
      <LabelRow htmlFor={tempId} label={label} {...labelProps} />
      <FieldWrapper>
    <StyledSelect {...props}>
      {data?.map((item) => (
        <option key={item.key} value={item.value}>
          {item.display || item.value}
        </option>
      ))}
    </StyledSelect>
    </FieldWrapper>
    </div>
  );
};

InputSelect.displayName = 'InputSelect';

export default memo(InputSelect);

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--input-color);
  background-color: var(--input-background-color);
  border-radius: var(--input-border-radius, 0);
  border: 1px solid var(--input-border-color);
  width: 100%;

  :focus {
    background-color: var(--input-background-focus-color);
    border-bottom: 1.5px solid var(--input-border-focus-color);
  }

  // &:focus:within {
  //   box-shadow: 0 0 0 1px var(--input-border-focus-color);
  // }
  &:has(input[required]) {
    border-left: 3px solid var(--input-border-required-color);
  }
`;

const StyledSelect = styled.select`
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: none;
  height: 32px;
  width: 100%;
`;
